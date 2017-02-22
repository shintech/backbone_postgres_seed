import promise from 'bluebird'

const options = {
  promiseLib: promise
};

const config = require("../_config");
const environment = process.env.NODE_ENV || 'development';
const pgp = require("pg-promise")(options);
const connectionString = config.postgresURI[environment];
const init = pgp(connectionString);
const database_name = connectionString.split('/');

if (process.env.NODE_ENV === "development"){
  console.log("Connected to database: " + database_name[database_name.length - 1]);
}

module.exports = init;