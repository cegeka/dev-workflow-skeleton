package be.cegeka.dws.acctests;

import static be.cegeka.dws.domain.pet.PetTestBuilder.aPet;
import static be.cegeka.dws.domain.pet.Race.DOG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.HttpMethod.GET;

import java.util.List;

import org.junit.Test;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.client.RestTemplate;

import be.cegeka.dws.domain.pet.Pet;

public class PetResourceIntegrationTest extends ResourceIntegrationTest {

	private static final int BURT_ID = 3;
	private static final Pet BURT = aPet()
			.withId(BURT_ID)
			.withName("Burt")
			.withRace(DOG)
			.withImageLocation("assets/img/dog1.jpg")
			.withProfileText("Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI")
			.build();
	private static final ParameterizedTypeReference<List<Pet>> PET_LIST = new ParameterizedTypeReference<List<Pet>>() {
	};

	private RestTemplate httpClient = new TestRestTemplate();

	@Test
	public void getPetById() {
		Pet pet = httpClient.getForObject("http://" + backendHost() + "/api/pet/" + BURT_ID, Pet.class);

		assertThat(pet).isEqualToComparingFieldByField(BURT);
	}

	@Test
	public void getPets() {
		List<Pet> pets = httpClient.exchange("http://" + backendHost() + "/api/pet", GET, null, PET_LIST).getBody();

		assertThat(pets).hasSize(7);
		assertThat(pets.stream().filter(pet -> pet.getId() == BURT_ID).findFirst().get())
				.isEqualToComparingFieldByField(BURT);
	}
}
