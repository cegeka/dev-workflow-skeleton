package be.cegeka.dws.infrastructure.spring;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.apache.tomcat.jdbc.pool.PoolConfiguration;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.skife.jdbi.v2.DBI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@PropertySource(value = {
		"classpath:/dws.default.properties",
		"classpath:/dws.${dws.environment}.properties"
}, ignoreResourceNotFound = true)
@ComponentScan("be.cegeka.dws.infrastructure")
public class InfrastructureConfig {

	@Inject
	private Environment environment;

	@Bean
	public DataSource dataSource() {
		PoolConfiguration poolConfiguration = new PoolProperties();
		poolConfiguration.setDriverClassName(environment.getProperty("db.driver"));
		poolConfiguration.setUrl(environment.getProperty("db.url"));
		poolConfiguration.setUsername(environment.getProperty("db.username"));
		poolConfiguration.setPassword(environment.getProperty("db.password"));
		return new org.apache.tomcat.jdbc.pool.DataSource(poolConfiguration);
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean
	public DBI dbi() {
		return new DBI(dataSource());
	}
}
