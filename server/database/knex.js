const config = require('../knexfile');
/**
 * require('knex') returns a function, config is a parameter for that
 * function. The function returns a database connection.
 */
module.exports = require('knex')(config);