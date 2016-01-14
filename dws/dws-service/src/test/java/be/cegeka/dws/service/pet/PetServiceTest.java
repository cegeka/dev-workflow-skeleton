package be.cegeka.dws.service.pet;

import static be.cegeka.dws.domain.pet.PetTestBuilder.aPet;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.domain.pet.PetRepository;
import be.cegeka.dws.infrastructure.UnitTest;

public class PetServiceTest extends UnitTest {

	@Mock
	private PetRepository repository;
	@InjectMocks
	private PetService service;

	@Test
	public void getAll() {
		Pet pet = aPet().build();
		when(repository.findAll()).thenReturn(asList(pet));

		List<Pet> actual = service.getAll();

		assertThat(actual).containsOnly(pet);
	}

	@Test
	public void getById() {
		Pet pet = aPet().build();
		when(repository.findById(1)).thenReturn(pet);

		Pet actual = service.getById(1);

		assertThat(actual).isEqualTo(pet);
	}
}
