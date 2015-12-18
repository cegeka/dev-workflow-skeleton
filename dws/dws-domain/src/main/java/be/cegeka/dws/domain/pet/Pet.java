package be.cegeka.dws.domain.pet;

public class Pet {

	private int id;
	private String name;
	private Race race;
	private String imageLocation;
	private String profileText;

	private Pet() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	private void setName(String name) {
		this.name = name;
	}

	public Race getRace() {
		return race;
	}

	private void setRace(Race race) {
		this.race = race;
	}

	public String getImageLocation() {
		return imageLocation;
	}

	private void setImageLocation(String imageLocation) {
		this.imageLocation = imageLocation;
	}

	public String getProfileText() {
		return profileText;
	}

	private void setProfileText(String profileText) {
		this.profileText = profileText;
	}

	static class PetBuilder {

		private Pet pet;

		private PetBuilder() {
			pet = new Pet();
		}

		public static PetBuilder pet() {
			return new PetBuilder();
		}

		public Pet build() {
			return pet;
		}

		public PetBuilder withId(int id) {
			pet.setId(id);
			return this;
		}

		public PetBuilder withName(String name) {
			pet.setName(name);
			return this;
		}

		public PetBuilder withRace(Race race) {
			pet.setRace(race);
			return this;
		}

		public PetBuilder withImageLocation(String imageLocation) {
			pet.setImageLocation(imageLocation);
			return this;
		}

		public PetBuilder withProfileText(String profileText) {
			pet.setProfileText(profileText);
			return this;
		}
	}
}
