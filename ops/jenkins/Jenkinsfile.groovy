/********** Global variables **********/
JENKINS_GIT_USERNAME = "jenkins-dws"
JENKINS_GIT_EMAIL = "j1291760@trbvm.com"

VERSION_NUMBER = ""
NO_OPTIONS = ""

/***** Networks *****/
JENKINS_NETWORK = "dws-jenkins"
ACC_NETWORK = "dws-acc"
PRD_NETWORK = "dws-prd"

/***** Images *****/
GRADLE_IMAGE = "dws/gradle"
GRADLE_FRONTEND_IMAGE = "dws/gradle-front-end"
GRADLE_E2E_IMAGE = "dws/gradle-e2e"

DB_CLEAN_IMAGE = "dws/db"
DB_MIGRATED_IMAGE = "dws/db-migrated"
BACKEND_IMAGE = "dws/back-end"
FRONTEND_IMAGE = "dws/front-end"

/***** Containers *****/
JENKINS_GRADLE_NAME = "dws_jenkins_gradle"

COMMIT_DB_NAME = "dws_jenkins_db_commit"

TEST_DB_NAME = "dws_jenkins_db_test"
TEST_BACKEND_NAME = "dws_jenkins_back-end_test"
TEST_FRONTEND_NAME = "dws_jenkins_front-end_test"

ACC_DB_NAME = "dws_db_acc"
ACC_DB_MOUNT_POINT = "acc"
ACC_BACKEND_NAME = "dws_back-end_acc"
ACC_FRONTEND_NAME = "dws_front-end_acc"
ACC_FRONTEND_PORT = 5050

PRD_DB_NAME = "dws_db_prd"
PRD_DB_MOUNT_POINT = "prd"
PRD_BACKEND_NAME = "dws_back-end_prd"
PRD_FRONTEND_NAME = "dws_front-end_prd"
PRD_FRONTEND_PORT = 6060

/*********** Build workflow ***********/
stage name: "commit"
node("linux && docker") {
	cleanWorkspace()
	cloneProject()
	determineVersionNumber()
	buildCleanDbImage()
	buildMigratedDbImage()
	buildWithoutE2ETests()
	stopWhenFailures()
	stashWorkspace()
}

stage name: "test"
node("linux && docker") {
	unstashWorkspace()
	buildDockerImages()
	e2eTests()
	stopWhenFailures()
	// tag()
	// dockerPushImages()
}

stage name: "pre-acc"
input "Do you want to deploy to acc?"

stage concurrency: 1, name: "acc"
node("linux && docker") {
	unstashWorkspace()
	stopAcc()
	startAcc()
}

stage name: "pre-prd"
input "Do you want to deploy to prd?"

stage concurrency: 1, name: "prd"
node("linux && docker") {
	unstashWorkspace()
	stopPrd()
	startPrd()
}

/********** Helper functions **********/
def cleanWorkspace() {
	sh "rm -rf *"
}

def cloneProject() {
	git /* credentialsId: "385df167-99f7-408d-b9d8-ad982a7c997b", */ url: "https://github.com/cegeka/dev-workflow-skeleton.git"
}

def determineVersionNumber() {
	sh "git rev-list --count HEAD > nb-commits.txt"
	def nbCommits = readFile("nb-commits.txt").trim()
	VERSION_NUMBER = "0.0.${nbCommits}"
}

def buildWithoutE2ETests() {
	def dbName = "${COMMIT_DB_NAME}_${VERSION_NUMBER}"

	try {
		startContainer(DB_MIGRATED_IMAGE, dbName, JENKINS_NETWORK, NO_OPTIONS)
		gradle("build -Pversion=${VERSION_NUMBER} -Ddb.host=${dbName}:5432", GRADLE_FRONTEND_IMAGE, JENKINS_NETWORK)
	} catch(err) {
		printError(err)
		currentBuild.result  = "FAILURE"
	} finally {
		removeContainer(dbName)
		archiveAllTestResults()
		archiveArtifacts()
	}
}

def e2eTests() {
	def dbName = "${TEST_DB_NAME}_${VERSION_NUMBER}"
	def backendName = "${TEST_BACKEND_NAME}_${VERSION_NUMBER}"
	def frontendName = "${TEST_FRONTEND_NAME}_${VERSION_NUMBER}"

	try {
		startTestApplication(dbName, backendName, frontendName)
		gradle("build -PrunAccTests -Pversion=${VERSION_NUMBER} -Djenkins -DfrontendHost=${frontendName}:80 -DbackendHost=${backendName}:8080", GRADLE_E2E_IMAGE, JENKINS_NETWORK)
	} catch(err) {
		printError(err)
		currentBuild.result  = "FAILURE"
	} finally {
		stopApplication(dbName, backendName, frontendName)
		archiveUiTestResults()
	}
}

def tag() {
	sh "git config user.name '${JENKINS_GIT_USERNAME}'"
	sh "git config user.email '${JENKINS_GIT_EMAIL}'"
	sh "git config push.default 'simple'"

	sh "git tag -a ${VERSION_NUMBER} -m 'Tag version ${VERSION_NUMBER}'"
	sh "git push origin ${VERSION_NUMBER}"
}

def dockerPushImages(){
	// TODO: push images to docker registry, e.g. nexus.cegeka.be
}

def gradle(task, gradleImageName, network) {
	def gradleName = "${JENKINS_GRADLE_NAME}_${VERSION_NUMBER}"

	try {
		startGradleContainer(gradleImageName, gradleName, network)
		execGradle(gradleName, task)
	} catch(err) {
		printError(err)
		currentBuild.result  = "FAILURE"
	} finally {
		removeContainer(gradleName)
	}
}

def archiveAllTestResults() {
	step([$class: "JUnitResultArchiver", testResults: "**/target/surefire-reports/TEST-*.xml"])
	step([$class: "JUnitResultArchiver", testResults: "**/target/failsafe-reports/TEST-*.xml"])
}

def archiveUiTestResults() {
	step([$class: "JUnitResultArchiver", testResults: "**/dws-acc-tests/target/surefire-reports/TEST-*.xml"])
	step([$class: "JUnitResultArchiver", testResults: "**/dws-acc-tests/target/failsafe-reports/TEST-*.xml"])
}

def archiveArtifacts() {
	step([$class: "ArtifactArchiver", artifacts: "**/target/*.jar", fingerprint: true])
	step([$class: "ArtifactArchiver", artifacts: "**/dws-ui/target/dist/**/*", fingerprint: true])
}

def stopWhenFailures() {
	if (currentBuild.result != null && !currentBuild.result.equalsIgnoreCase("STABLE")) {
		error "There are failures in the current stage. The current build will be stopped."
	}
}

def stashWorkspace() {
	stash includes: '**/*', name: 'workspace', useDefaultExcludes: false
}

def unstashWorkspace() {
	unstash "workspace"
}

def printError(error) {
	println "******************************* WORKFLOW ERROR *******************************"
	println "${error}"
	println "******************************************************************************"
}

/********** DWS Docker functions **********/
def buildDockerImages() {
	buildCleanDbImage()
	buildBackendImage()
	buildFrontendImage()
}

def buildCleanDbImage() {
	sh "docker build -t ${DB_CLEAN_IMAGE}:${VERSION_NUMBER} ops/dws/db/clean/"
}

def buildMigratedDbImage() {
	sh "(echo 'FROM dws/db:${VERSION_NUMBER}' && cat ops/dws/db/migrated/Dockerfile.template) > ops/dws/db/migrated/Dockerfile"
	sh "mkdir -p ops/dws/db/migrated/db/migration"
	sh "cp -r dws/dws-infrastructure/src/main/resources/db/migration/* ops/dws/db/migrated/db/migration/"
	sh "docker build -t ${DB_MIGRATED_IMAGE}:${VERSION_NUMBER} ops/dws/db/migrated/"
}

def buildBackendImage() {
	sh "mkdir ops/dws/back-end/dws-jar"
	sh "cp dws/dws-rest/target/dws-rest-${VERSION_NUMBER}.jar ops/dws/back-end/dws-jar/dws-rest.jar"
	dir("ops/dws/back-end") {
		sh "docker build -t ${BACKEND_IMAGE}:${VERSION_NUMBER} ."
	}
}

def buildFrontendImage() {
	sh "mkdir ops/dws/front-end/dws-dist"
	sh "cp -r dws/dws-ui/target/dist/* ops/dws/front-end/dws-dist/"
	dir("ops/dws/front-end") {
		sh "docker build -t ${FRONTEND_IMAGE}:${VERSION_NUMBER} ."
	}
}

def startTestApplication(dbName, backendName, frontendName) {
	startContainer(DB_MIGRATED_IMAGE, dbName, JENKINS_NETWORK, NO_OPTIONS)
	startContainer(BACKEND_IMAGE, backendName, JENKINS_NETWORK, "--env db.host=${dbName}:5432")
	startContainer(FRONTEND_IMAGE, frontendName, JENKINS_NETWORK, "--env dws_api_proxy=${backendName}:8080")
}

def startApplication(dbName, dbMountPoint, backendName, frontendName, frontendPort, network) {
	startContainer(DB_CLEAN_IMAGE, dbName, network, "-v /data/dws/db/${dbMountPoint}:/var/lib/postgresql/data")
	retry(2) { gradle("flywayMigrate -i", GRADLE_IMAGE, network) }
	startContainer(BACKEND_IMAGE, backendName, network, "--env db.host=${dbName}:5432")
	startContainer(FRONTEND_IMAGE, frontendName, network, "-p ${frontendPort}:80 --env dws_api_proxy=${backendName}:8080")
}

def startAcc(){
	createNetwork(ACC_NETWORK)
	startApplication(ACC_DB_NAME, ACC_DB_MOUNT_POINT, ACC_BACKEND_NAME, ACC_FRONTEND_NAME, ACC_FRONTEND_PORT, ACC_NETWORK)
}

def startPrd(){
	createNetwork(PRD_NETWORK)
	startApplication(PRD_DB_NAME, PRD_DB_MOUNT_POINT, PRD_BACKEND_NAME, PRD_FRONTEND_NAME, PRD_FRONTEND_PORT, PRD_NETWORK)
}

def stopApplication(dbName, backendName, frontendName) {
	removeContainer(frontendName)
	removeContainer(backendName)
	removeContainer(dbName)
}

def stopAcc() {
	stopApplication(ACC_DB_NAME, ACC_BACKEND_NAME, ACC_FRONTEND_NAME)
	removeNetwork(ACC_NETWORK)
}

def stopPrd() {
	stopApplication(PRD_DB_NAME, PRD_BACKEND_NAME, PRD_FRONTEND_NAME)
	removeNetwork(PRD_NETWORK)
}

/********** Basic Docker functions **********/
def startContainer(imageName, containerName, network, options) {
	killContainer(containerName)
	sh "docker run -d --net ${network} --name ${containerName} ${options} ${imageName}:${VERSION_NUMBER}"
}

def startGradleContainer(gradleImageName, gradleContainerName, network) {
	def currentDir = pwd()
	killContainer(gradleContainerName)
	sh "docker run -t -d --name ${gradleContainerName} --net ${network} -v $currentDir/dws:/usr/src/dws -v /var/jenkins_home/.m2:/root/.m2 ${gradleImageName}"
}

def execGradle(gradleContainerName, task) {
	sh "docker exec ${gradleContainerName} gradlew --continue ${task}"
}

def killContainer(name) {
	try { sh "docker rm -vf ${name}" } catch(err) {}
}

def removeContainer(name) {
	try { sh "docker stop ${name}" } catch(err){}
	try { sh "docker rm -v ${name}" } catch(err){}
}

def createNetwork(network) {
	sh "docker network create -d bridge ${network}"
}

def removeNetwork(network) {
	try { sh "docker network rm ${network}" } catch(err){}
}