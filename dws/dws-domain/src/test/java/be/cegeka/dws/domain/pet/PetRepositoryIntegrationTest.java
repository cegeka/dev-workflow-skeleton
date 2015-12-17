package be.cegeka.dws.domain.pet;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import javax.inject.Inject;

import org.junit.Ignore;
import org.junit.Test;

import be.cegeka.dws.domain.DomainIntegrationTest;

@Ignore
public class PetRepositoryIntegrationTest extends DomainIntegrationTest {

	@Inject
	private PetRepository petRepository;

	@Test
	public void findAll() {
		List<Pet> pets = petRepository.findAll();

		assertThat(pets).hasSize(7);
	}
}
