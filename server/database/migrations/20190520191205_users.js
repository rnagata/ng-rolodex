
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNull().unique();
    table.timestamps(true, true);
    table.string('name').notNull();
    table.string('email').notNull();
    table.string('address').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
