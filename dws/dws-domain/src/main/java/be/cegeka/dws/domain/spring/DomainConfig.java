package be.cegeka.dws.domain.spring;

import javax.inject.Inject;

import org.skife.jdbi.v2.DBI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import be.cegeka.dws.domain.pet.PetRepository;

@Configuration
@ComponentScan("be.cegeka.dws.domain")
public class DomainConfig {

	@Inject
	private DBI dbi;

	@Bean
	public PetRepository petRepository() {
		return dbi.onDemand(PetRepository.class);
	}
}
