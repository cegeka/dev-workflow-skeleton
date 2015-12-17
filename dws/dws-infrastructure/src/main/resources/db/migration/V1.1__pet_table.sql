CREATE TYPE RACE AS ENUM('CHICKEN', 'DOG', 'CAT');

CREATE TABLE pet(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    race RACE NOT NULL,
    image_location TEXT NOT NULL,
    profile_text TEXT
);