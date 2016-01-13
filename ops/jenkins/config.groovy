import jenkins.model.*
import hudson.tasks.*
import org.jenkinsci.plugins.xvfb.*

def jenkins = Jenkins.instance;
jenkins.setNumExecutors(5);
jenkins.setLabelString("linux docker xvfb");

def xvfb = new XvfbInstallation("xvfb", "/usr/bin", []);
def xvfbExtension = jenkins.getExtensionList(XvfbInstallation.DescriptorImpl.class).get(0);
xvfbExtension.setInstallations(xvfb);
