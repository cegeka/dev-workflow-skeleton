package be.cegeka.dws.acctests;

public abstract class ResourceIntegrationTest {

	public final String backendHost() {
		if (System.getProperty("backendHost") != null) {
			return System.getProperty("backendHost");
		}
		return "localhost:8080";
	}
}
