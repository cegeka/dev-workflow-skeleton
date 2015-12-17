package be.cegeka.dws.domain;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import be.cegeka.dws.domain.spring.DomainConfig;
import be.cegeka.dws.infrastructure.spring.InfrastructureConfig;

@ContextConfiguration(classes = { DomainConfig.class, InfrastructureConfig.class })
public abstract class DomainIntegrationTest extends AbstractTransactionalJUnit4SpringContextTests {

}
