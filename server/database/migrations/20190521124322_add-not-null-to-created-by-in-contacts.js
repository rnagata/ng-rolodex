
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('contacts', (table) => {
    table.integer('created_by').notNull().alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('contacts', (table) => {
    table.integer('created_by').references('id').inTable('users').alter();
  })
};
