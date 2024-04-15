CREATE TABLE run (
	id SERIAL PRIMARY KEY,
	location VARCHAR (100),
	date DATE,
	distance DECIMAL (3, 2),
	pace VARCHAR (10),
	comments VARCHAR (1000)
);
