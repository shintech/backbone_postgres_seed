
CREATE DATABASE api_production;

\c api_production;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  attribute INTEGER,
  current_day TIMESTAMP without time zone default (now() at time zone 'utc')
);