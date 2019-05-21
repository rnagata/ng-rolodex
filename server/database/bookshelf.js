// Refers to knex.js and gets the database connection from module.exports
const knex = require('./knex');

// bookshelf instance
const bookshelf = require('bookshelf')(knex);

// handles circular dependencies.
bookshelf.plugin('registry');
module.exports = bookshelf;