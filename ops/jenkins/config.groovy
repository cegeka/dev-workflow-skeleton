import jenkins.model.*
import hudson.tasks.*

def jenkins = Jenkins.instance;
jenkins.setNumExecutors(5);
jenkins.setLabelString("linux jdk8 mvn3");

def jdk8 = new hudson.model.JDK("jdk8", "/usr/lib/jvm/java-8-oracle");
jenkins.setJDKs([jdk8]);

def mvnExtenstions = jenkins.getExtensionList(hudson.tasks.Maven.DescriptorImpl.class)[0];
def mvnExtenstionsList = (mvnExtenstions.installations as List);
mvnExtenstionsList.add(new hudson.tasks.Maven.MavenInstallation("mvn3", "/opt/apache-maven-3.3.9"));
mvnExtenstions.installations = mvnExtenstionsList;
mvnExtenstions.save();