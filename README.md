## Innovation Center: Rapid Development

The goal of this innovation center is to set up a small project that can be used to quickly bootstrap the development of new applications. 

## How to get it up and running from scratch (Linux)
### Software dependencies

1. Install [Git](https://git-scm.com/)
  1. `sudo apt-get install git`
  2. `git config --global user.name "<Your Name>"`
  3. `git config --global user.email "<Your Email>"`
  4. `git config --global push.default "simple"`
  5. `git config --global pull.rebase true`
  6. `git config --global url."https://".insteadOf git://`
  7. `git config --global credential.helper 'cache --timeout=18000'`
2. Install an editor, e.g. [SublimeText](http://www.sublimetext.com/)
  1. `sudo add-apt-repository ppa:webupd8team/sublime-text-3`
  2. `sudo apt-get update`
  3. `sudo apt-get install sublime-text-installer`
3. Install [Node.js](https://nodejs.org/en/)
  1. `curl --silent --location https://deb.nodesource.com/setup_5.x | sudo bash -`
  2. `sudo apt-get install nodejs`
4. Install [npm](https://www.npmjs.com/), to [avoid permission errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions):
  1. `mkdir $HOME/.npm_global`
  2. `npm config set prefix=$HOME/.npm_global`
  3. `npm install -g npm`
  4. add `export PATH="$HOME/.npm_global/bin:$PATH"` to end of `~/.bashrc`
  5. restart your terminal
5. Install [Bower](http://bower.io/) 
  1. `npm install -g bower`
6. Install [Gulp](http://gulpjs.com/)
  1. `npm install -g gulp`
7. Install [Java](http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html)
  1. `sudo add-apt-repository ppa:webupd8team/java`
  2. `sudo apt-get update`
  3. `sudo apt-get install oracle-java8-installer`
8. Install [Maven](https://maven.apache.org/)
  1. `curl -s http://apache.belnet.be/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz > apache-maven-3.3.9-bin.tar.gz`
  2. `tar xzvf apache-maven-3.3.9-bin.tar.gz`
  3. `sudo mv apache-maven-3.3.9 /opt`
  4. `sudo ln -s /opt/apache-maven-3.3.9/bin/mvn /usr/local/bin/mvn`
9. Install [Eclipse IDE For Java EE Developers](http://www.eclipse.org/downloads/)
  1. `curl curl http://ftp-stud.fht-esslingen.de/pub/Mirrors/eclipse/technology/epp/downloads/release/mars/1/eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz > eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz`
  2. `tar xzvf eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz`
  3. `sudo mv eclipse /opt`
  4. `sudo ln -s /opt/eclipse/eclipse /usr/local/bin/eclipse`
  5. If you want to access eclipse from the launcher create /usr/share/applications/eclipse.desktop as described at [link](http://difusal.blogspot.be/2015/06/how-to-install-eclipse-mars-45-on-ubuntu.html)
10. Install [Docker](https://docs.docker.com/engine/installation/ubuntulinux/)
  1. [Create a Docker group](https://docs.docker.com/engine/installation/ubuntulinux/#create-a-docker-group)
  2. Add `127.0.0.1 dws_db_1` to /etc/hosts 
11. Install [Docker Compose](https://docs.docker.com/compose/install/)
  1. `sudo -i`
  2. ``curl -L https://github.com/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose``
  3. `chmod +x /usr/local/bin/docker-compose`
  4. ` curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose --version | awk 'NR==1{print $NF}')/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
`
`


### Setup
1. `git clone https://github.com/cegeka/dev-workflow-skeleton.git`
2. `cd dev-workflow-skeleton/ops/scripts`
2. `./start-local.db.sh` to run the database
4. `cd ../../dws` to get from the project root to the maven root
5. `mvn clean install` to initiate the data base content
6. import the project as an maven project in eclipse
7. switch your prefered maven installation within eclipse to the one you installed previously
6. run the application in eclipse
7. `cd dws-ui`
8. `gulp` in front-end root to build front-end
9. `gulp dev` in front-end root to start application, go to http://localhost:8080
