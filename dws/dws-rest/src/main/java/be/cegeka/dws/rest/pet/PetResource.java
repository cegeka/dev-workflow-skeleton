package be.cegeka.dws.rest.pet;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.service.pet.PetService;

@Named
@Path("/pet")
public class PetResource {

	@Inject
	private PetService service;

	@GET
	@Produces(APPLICATION_JSON)
	public List<Pet> getPets() {
		return service.getAll();
	}
}
