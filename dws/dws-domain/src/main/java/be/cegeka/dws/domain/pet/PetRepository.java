package be.cegeka.dws.domain.pet;

import static be.cegeka.dws.domain.pet.Pet.PetBuilder.pet;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

public interface PetRepository {

	@SqlQuery("SELECT * FROM pet")
	@Mapper(PetMapper.class)
	public List<Pet> findAll();

	public static class PetMapper implements ResultSetMapper<Pet> {

		@Override
		public Pet map(int index, ResultSet r, StatementContext ctx) throws SQLException {
			return pet()
					.withName(r.getString("name"))
					.withRace(Race.valueOf(r.getString("race")))
					.withImageLocation(r.getString("image_location"))
					.withProfileText(r.getString("profile_text"))
					.build();
		}

	}
}