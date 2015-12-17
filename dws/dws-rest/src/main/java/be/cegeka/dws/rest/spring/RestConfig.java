package be.cegeka.dws.rest.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("be.cegeka.dws.rest")
public class RestConfig {

	@Bean
	public JerseyConfig jerseyConfig() {
		return new JerseyConfig();
	}
}
