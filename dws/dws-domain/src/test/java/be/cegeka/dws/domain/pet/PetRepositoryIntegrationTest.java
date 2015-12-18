package be.cegeka.dws.domain.pet;

import static be.cegeka.dws.domain.pet.Pet.PetBuilder.pet;
import static be.cegeka.dws.domain.pet.Race.DOG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.groups.Tuple.tuple;

import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import be.cegeka.dws.domain.DomainIntegrationTest;

public class PetRepositoryIntegrationTest extends DomainIntegrationTest {

	private static final int ID = 3;
	private static final String NAME = "Burt";
	private static final Race RACE = DOG;
	private static final String IMAGE_LOCATION = "assets/img/dog1.jpg";
	private static final String PROFILE_TEXT = "Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI";

	@Inject
	private PetRepository petRepository;

	@Test
	public void findAll() {
		List<Pet> pets = petRepository.findAll();

		assertThat(pets).hasSize(7);
		assertThat(pets)
				.filteredOn("name", NAME)
				.extracting("name", "race", "imageLocation", "profileText")
				.containsExactly(tuple(NAME, RACE, IMAGE_LOCATION, PROFILE_TEXT));
	}

	@Test
	public void findById() {
		Pet pet = petRepository.findById(ID);

		Pet burt = pet()
				.withId(ID)
				.withName(NAME)
				.withRace(RACE)
				.withImageLocation(IMAGE_LOCATION)
				.withProfileText(PROFILE_TEXT)
				.build();

		assertThat(pet).isEqualToComparingFieldByField(burt);
	}
}
