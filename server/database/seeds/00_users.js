
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testUser', name: 'seed', email: 'test@domain.com', address: 'my address'},
      ]);
    });
};
