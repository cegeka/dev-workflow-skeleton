package be.cegeka.dws.rest.pet;

import static be.cegeka.dws.domain.pet.PetTestBuilder.aPet;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.infrasctructure.UnitTest;
import be.cegeka.dws.service.pet.PetService;

public class PetResourceTest extends UnitTest {

	@Mock
	private PetService service;
	@InjectMocks
	private PetResource resource;

	@Test
	public void getPets() {
		Pet pet = aPet().build();
		when(service.getAll()).thenReturn(asList(pet));

		List<Pet> actual = resource.getPets();

		assertThat(actual).containsOnly(pet);
	}
}
