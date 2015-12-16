package be.cegeka.dws.domain.pet;

import static be.cegeka.dws.domain.pet.Race.CHICKEN;

public class PetTestBuilder {

	private Pet pet;

	private PetTestBuilder() {
		pet = new Pet();
	}

	public static PetTestBuilder aPet() {
		return new PetTestBuilder()
				.withName("Princess")
				.withKind(CHICKEN)
				.withProfileText("A fluffy chicken")
				.withImageLocation("/assets/princess.jpg");
	}

	public Pet build() {
		return pet;
	}

	public PetTestBuilder withName(String name) {
		pet.setName(name);
		return this;
	}

	public PetTestBuilder withKind(Race kind) {
		pet.setKind(kind);
		return this;
	}

	public PetTestBuilder withImageLocation(String imageLocation) {
		pet.setImageLocation(imageLocation);
		return this;
	}

	public PetTestBuilder withProfileText(String profileText) {
		pet.setProfileText(profileText);
		return this;
	}

}
