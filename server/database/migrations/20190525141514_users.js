
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.string('password').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('password');
  });
};
