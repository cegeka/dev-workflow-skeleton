FROM jenkins:1.625.3

COPY executors.groovy /usr/share/jenkins/ref/init.groovy.d/executors.groovy

COPY plugins.txt /usr/share/jenkins/ref/
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/ref/plugins.txt