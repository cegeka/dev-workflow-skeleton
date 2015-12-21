package be.cegeka.dws.rest.pet;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.service.pet.PetService;

@Path("/pet")
public class PetResource {

	@Inject
	private PetService service;

	@GET
	@Path("/{id}")
	@Produces(APPLICATION_JSON)
	public Pet getPetById(@PathParam("id") int id) {
		return service.getById(id);
	}

	@GET
	@Produces(APPLICATION_JSON)
	public List<Pet> getPets() {
		return service.getAll();
	}
}
