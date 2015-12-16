package be.cegeka.dws.service.pet;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.domain.pet.PetRepository;

@Named
public class PetService {

	@Inject
	private PetRepository petRepository;

	public List<Pet> getAll() {
		return petRepository.findAll();
	}
}