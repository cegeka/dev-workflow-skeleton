FROM jenkins:1.625.3

ENV JENKINS_OPTS --httpPort=8888

USER root
RUN apt-get update && apt-get install -y lxc

COPY config.groovy /usr/share/jenkins/ref/init.groovy.d/config.groovy

COPY plugins.txt /usr/share/jenkins/ref/
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/ref/plugins.txt

RUN git config --global credential.helper 'cache --timeout=18000'