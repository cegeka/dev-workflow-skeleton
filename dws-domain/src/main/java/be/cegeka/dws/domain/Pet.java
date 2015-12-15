package be.cegeka.dws.domain;

public class Pet {

	private String name;
	private Race kind;
	private String imgLocation;
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

	public String getImgLocation() {
		return imgLocation;
	}

	public void setImgLocation(String imgLocation) {
		this.imgLocation = imgLocation;
	}

	public String getProfileText() {
		return profileText;
	}

	public void setProfileText(String profileText) {
		this.profileText = profileText;
	}
}
