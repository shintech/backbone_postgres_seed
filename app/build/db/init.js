'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../_config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  promiseLib: _bluebird2.default
};

const environment = process.env.NODE_ENV || 'development';
const pgp = require('pg-promise')(options);
const connectionString = _config2.default.postgresURI[environment];
const init = pgp(connectionString);
const databaseName = connectionString.split('/');

if (process.env.NODE_ENV === 'development') {
  console.log('Connected to database: ' + databaseName[databaseName.length - 1]);
}

module.exports = init;