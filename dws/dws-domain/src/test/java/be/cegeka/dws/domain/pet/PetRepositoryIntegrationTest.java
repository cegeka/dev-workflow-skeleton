package be.cegeka.dws.domain.pet;

import static be.cegeka.dws.domain.pet.PetTestBuilder.aPet;
import static be.cegeka.dws.domain.pet.Race.DOG;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import be.cegeka.dws.domain.DomainIntegrationTest;

public class PetRepositoryIntegrationTest extends DomainIntegrationTest {

	private static final int BURT_ID = 3;
	private static final Pet BURT = aPet()
			.withId(BURT_ID)
			.withName("Burt")
			.withRace(DOG)
			.withImageLocation("assets/img/dog1.jpg")
			.withProfileText("Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI")
			.build();

	@Inject
	private PetRepository petRepository;

	@Test
	public void findAll() {
		List<Pet> pets = petRepository.findAll();

		assertThat(pets).hasSize(7);
		assertThat(pets.stream().filter(pet -> pet.getId() == BURT_ID).findFirst().get())
				.isEqualToComparingFieldByField(BURT);
	}

	@Test
	public void findById() {
		Pet pet = petRepository.findById(BURT_ID);

		assertThat(pet).isEqualToComparingFieldByField(BURT);
	}
}
