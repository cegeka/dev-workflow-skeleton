## Innovation Center: Rapid Development

The goal of this innovation center is to set up a small project that can be used to quickly bootstrap the development of new applications. 

## How to get it up and running from scratch (Linux)
### General Setup

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


### Project Setup
1. `git clone https://github.com/cegeka/dev-workflow-skeleton.git`


### Front-end Setup
1. `cd dws/dws-ui` from project root to get to front-end root
2. `npm install` in front-end root
3. `bower install` in front-end root
4. `node_modules/protractor/bin/webdriver-manager update` in front-end root
5. `gulp` in front-end root to build front-end
6. `gulp dev` in front-end root to start application, go to http://localhost:8080
