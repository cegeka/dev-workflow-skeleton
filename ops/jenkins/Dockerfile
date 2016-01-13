FROM jenkins:1.625.3

ENV JENKINS_OPTS --httpPort=8888

USER root

# Install xvfb
RUN apt-get update && \
		apt-get install -y xvfb

# Install firefox
RUN echo "deb http://packages.linuxmint.com debian import" >> /etc/apt/sources.list && \
		apt-get update && \
		apt-get install -y --force-yes firefox

# Install front-end build dependencies
RUN apt-get install -y make g++ bzip2

# Use host docker
RUN apt-get install -y lxc

COPY config.groovy /usr/share/jenkins/ref/init.groovy.d/config.groovy

COPY plugins.txt /usr/share/jenkins/ref/
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/ref/plugins.txt

RUN git config --global user.name "jenkins-dws" && \
		git config --global user.email "j1291760@trbvm.com" && \
		git config --global push.default "simple" && \
		git config --global pull.rebase true && \
		git config --global url."https://".insteadOf git:// && \
		git config --global credential.helper 'cache --timeout=18000'