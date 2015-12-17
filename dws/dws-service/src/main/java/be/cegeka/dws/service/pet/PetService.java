package be.cegeka.dws.service.pet;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

import be.cegeka.dws.domain.pet.Pet;
import be.cegeka.dws.domain.pet.PetRepository;

@Named
@Transactional
public class PetService {

	@Inject
	private PetRepository petRepository;

	public List<Pet> getAll() {
		return petRepository.findAll();
	}
}