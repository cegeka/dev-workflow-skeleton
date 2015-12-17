CREATE TYPE RACE AS ENUM('CHICKEN', 'DOG', 'CAT');

CREATE TABLE pet(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    race RACE NOT NULL,
    image_location TEXT NOT NULL,
    profile_text TEXT
);

INSERT INTO pet(name, race, image_location, profile_text) VALUES
('Princess', 'CHICKEN', 'assets/img/chicken1.jpg', 'Meet Princess Fluffybutt! She is one of the fluffiest chickens you will ever meet. Most often you''ll find Princess cuddled up in the warmest spot she can find, and if that happens to be in your lap, well then that''s fine for her too! Princess also enjoys nomming treats out of your hand, clucking softly under her breath, and following her three sisters around the yard. Get to know Princess today!'),
('MrFuzz', 'CAT', 'assets/img/cat1.jpg', 'MrFuzz loves belly rubs, and likes playing with pieces of string'),
('Burt', 'DOG', 'assets/img/dog1.jpg', 'Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI'),
('MissPoes', 'CAT', 'assets/img/cat2.jpg', 'MissPoes is a classy lady who appreciates gentle pets'),
('Lady', 'DOG', 'assets/img/dog2.jpg', 'Lady isn''t always very lady-like. She loves rolling in the mud and barking at naughty squirrels'),
('Grumpy', 'CAT', 'assets/img/cat3.jpg', 'Grumpy basically hates everything, especially dogs. He does looove lasagne though'),
('Bobby', 'DOG', 'assets/img/dog3.jpg', 'Bobby loves to fetch balls and chase rabbits. Great with kids.');