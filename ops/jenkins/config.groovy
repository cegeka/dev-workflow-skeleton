import jenkins.model.*
import hudson.tasks.*
import org.jenkinsci.plugins.xvfb.*

def jenkins = Jenkins.instance;
jenkins.setNumExecutors(5);
jenkins.setLabelString("linux jdk8 mvn3 docker xvfb");

def jdk8 = new hudson.model.JDK("jdk8", "/usr/lib/jvm/java-8-oracle");
jenkins.setJDKs([jdk8]);

def mvn3 = new Maven.MavenInstallation("mvn3", "/opt/apache-maven-3.3.9", []);
def mvnExtension = jenkins.getExtensionList(Maven.DescriptorImpl.class).get(0);
mvnExtension.setInstallations(mvn3);

def xvfb = new XvfbInstallation("xvfb", "/usr/bin", []);
def xvfbExtension = jenkins.getExtensionList(XvfbInstallation.DescriptorImpl.class).get(0);
xvfbExtension.setInstallations(xvfb);
