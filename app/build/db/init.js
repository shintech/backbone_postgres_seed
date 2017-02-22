'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  promiseLib: _bluebird2.default
};

const config = require("../_config");
const environment = process.env.NODE_ENV || 'development';
const pgp = require("pg-promise")(options);
const connectionString = config.postgresURI[environment];
const init = pgp(connectionString);
const database_name = connectionString.split('/');

if (process.env.NODE_ENV === "development") {
  console.log("Connected to database: " + database_name[database_name.length - 1]);
}

module.exports = init;