package be.cegeka.dws.domain.pet;

import static java.util.Arrays.asList;

import java.util.List;

import javax.inject.Named;

@Named
public class PetRepository {

	public List<Pet> findAll() {
		Pet pet = new Pet();
		pet.setName("Pet");
		return asList(pet);
	}
}
