import jenkins.model.*

def jenkins = Jenkins.instance;
jenkins.setNumExecutors(5);
jenkins.setLabelString("linux");