FROM jenkins:1.625.3

ENV JENKINS_OPTS --httpPort=8888

USER root

# Instal jdk8
RUN echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee /etc/apt/sources.list.d/webupd8team-java.list && \
		echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list && \
		echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
		apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886 && \
		apt-get update && \
		apt-get install -y oracle-java8-installer

# Install mvn 3.3.9
RUN curl -s http://apache.belnet.be/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz > /tmp/apache-maven-3.3.9-bin.tar.gz && \
		tar xzvf /tmp/apache-maven-3.3.9-bin.tar.gz -C /tmp && \
		mv /tmp/apache-maven-3.3.9 /opt && \
		rm -r /tmp/apache-maven-3.3.9-bin.tar.gz

# Install front-end build dependencies
RUN apt-get install -y make g++ bzip2

# Use host docker
RUN apt-get install -y lxc

COPY config.groovy /usr/share/jenkins/ref/init.groovy.d/config.groovy

COPY plugins.txt /usr/share/jenkins/ref/
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/ref/plugins.txt

RUN git config --global url."https://".insteadOf git://