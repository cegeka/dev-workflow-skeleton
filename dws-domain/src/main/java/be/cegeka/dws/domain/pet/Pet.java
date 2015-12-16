package be.cegeka.dws.domain.pet;

public class Pet {

	private String name;
	private Race kind;
	private String imageLocation;
	private String profileText;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Race getKind() {
		return kind;
	}

	public void setKind(Race kind) {
		this.kind = kind;
	}

	public String getImageLocation() {
		return imageLocation;
	}

	public void setImageLocation(String imageLocation) {
		this.imageLocation = imageLocation;
	}

	public String getProfileText() {
		return profileText;
	}

	public void setProfileText(String profileText) {
		this.profileText = profileText;
	}
}
