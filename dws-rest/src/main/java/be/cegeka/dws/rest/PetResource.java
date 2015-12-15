package be.cegeka.dws.rest;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.springframework.stereotype.Component;

import be.cegeka.dws.domain.Pet;

@Component
@Path("/pet")
public class PetResource {

	@GET
	@Produces(APPLICATION_JSON)
	public Pet getPet() {
		Pet pet = new Pet();
		pet.setName("Pet");
		return pet;
	}
}
