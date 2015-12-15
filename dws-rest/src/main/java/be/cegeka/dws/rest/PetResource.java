package be.cegeka.dws.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.stereotype.Component;

@Component
@Path("/pet")
public class PetResource {

	@GET
	public String getPet() {
		return "I'm a cool pet!.";
	}
}
