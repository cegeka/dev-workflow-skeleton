package be.cegeka.dws.rest.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import be.cegeka.dws.domain.spring.DomainConfig;
import be.cegeka.dws.infrastructure.spring.InfrastructureConfig;
import be.cegeka.dws.service.spring.ServiceConfig;

@SpringBootApplication
@Import({ ServiceConfig.class, DomainConfig.class, InfrastructureConfig.class })
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
