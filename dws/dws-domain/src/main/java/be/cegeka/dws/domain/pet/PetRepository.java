package be.cegeka.dws.domain.pet;

import static java.util.Arrays.asList;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

@Named
public class PetRepository {

	@Inject
	private DataSource dataSource;

	
	
	public List<Pet> findAll() {
		Pet pet = new Pet();
		pet.setName("Pet");
		return asList(pet);
	}
}
