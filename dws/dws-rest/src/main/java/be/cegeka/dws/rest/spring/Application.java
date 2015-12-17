package be.cegeka.dws.rest.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;

import be.cegeka.dws.domain.spring.DomainConfig;
import be.cegeka.dws.infrastructure.spring.InfrastructureConfig;
import be.cegeka.dws.service.spring.ServiceConfig;

@Import({
		InfrastructureConfig.class,
		DomainConfig.class,
		ServiceConfig.class,
		RestConfig.class
})
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
