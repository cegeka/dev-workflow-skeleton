package be.cegeka.dws.infrastructure.spring;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.skife.jdbi.v2.DBI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("be.cegeka.dws.infrastructure")
public class InfrastructureConfig {

	@Inject
	private DataSource dataSource;

	@Bean
	public DBI dbi() {
		return new DBI(dataSource);
	}
}
