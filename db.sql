DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  attribute INTEGER,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

INSERT INTO models ( name, attribute )
VALUES ( 'test1', 1 );
INSERT INTO models ( name, attribute )
VALUES ( 'test2', 2 );
INSERT INTO models ( name, attribute )
VALUES ( 'test3', 3 );
INSERT INTO models ( name, attribute )
VALUES ( 'test4', 4 );
INSERT INTO models ( name, attribute )
VALUES ( 'test5', 5 );
INSERT INTO models ( name, attribute )
VALUES ( 'test6', 6 );
INSERT INTO models ( name, attribute )
VALUES ( 'test7', 7 );
INSERT INTO models ( name, attribute )
VALUES ( 'test8', 8 );
INSERT INTO models ( name, attribute )
VALUES ( 'test9', 9 );
INSERT INTO models ( name, attribute )
VALUES ( 'test10', 10 );


CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);

INSERT INTO users ( username, password )
VALUES ( 'mprather', 'password' );

---------------------------------------------------------------------------

DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  attribute INTEGER,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);
