package be.cegeka.dws.infrastructure.spring;

import javax.sql.DataSource;

import org.apache.tomcat.jdbc.pool.PoolConfiguration;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.skife.jdbi.v2.DBI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@ComponentScan("be.cegeka.dws.infrastructure")
public class InfrastructureConfig {

	@Bean
	public DataSource dataSource() {
		PoolConfiguration poolConfiguration = new PoolProperties();
		poolConfiguration.setDriverClassName("org.postgresql.Driver");
		poolConfiguration.setUrl("jdbc:postgresql://localhost:5432/dws");
		poolConfiguration.setUsername("dws");
		poolConfiguration.setPassword("dws");
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
