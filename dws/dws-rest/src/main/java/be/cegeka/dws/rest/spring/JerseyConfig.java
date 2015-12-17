package be.cegeka.dws.rest.spring;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/api")
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		packages("be.cegeka.dws.rest");
	}
}
