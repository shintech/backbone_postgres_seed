DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    title VARCHAR,
    username VARCHAR,
    password VARCHAR,
    phone VARCHAR,
    email VARCHAR,
    admin BOOLEAN DEFAULT false
);


INSERT INTO users ( first_name, last_name, title, username, password, phone, email )
VALUES ('Kill', 'Bill', 'management', 'killbill', 'password', '5555555555', 'killbill@kill.bill');

DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    title VARCHAR,
    username VARCHAR,
    password VARCHAR,
    phone VARCHAR,
    email VARCHAR
);

DROP DATABASE IF EXISTS api_production;
CREATE DATABASE api_production;

\c api_production;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    title VARCHAR,
    username VARCHAR,
    password VARCHAR,
    phone VARCHAR,
    email VARCHAR
);