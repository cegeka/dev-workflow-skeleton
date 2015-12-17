package be.cegeka.dws.domain.pet;

import static be.cegeka.dws.domain.pet.Race.CHICKEN;

import be.cegeka.dws.domain.pet.Pet.PetBuilder;

public class PetTestBuilder {

	private PetBuilder petBuilder;

	private PetTestBuilder() {
		petBuilder = PetBuilder.pet();
	}

	public static PetTestBuilder aPet() {
		return new PetTestBuilder().withName("Princess").withRace(CHICKEN).withProfileText("A fluffy chicken")
				.withImageLocation("/assets/princess.jpg");
	}

	public Pet build() {
		return petBuilder.build();
	}

	public PetTestBuilder withName(String name) {
		petBuilder.withName(name);
		return this;
	}

	public PetTestBuilder withRace(Race race) {
		petBuilder.withRace(race);
		return this;
	}

	public PetTestBuilder withImageLocation(String imageLocation) {
		petBuilder.withImageLocation(imageLocation);
		return this;
	}

	public PetTestBuilder withProfileText(String profileText) {
		petBuilder.withProfileText(profileText);
		return this;
	}
}
