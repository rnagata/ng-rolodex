
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        { name: 'test contact 1', 
          address: 'contact 1 address', 
          mobile: 'contact 1 mobile', 
          work: 'contact 1 work',
          home: 'contact 1 home',
          email: 'contact 1 email',
          twitter: 'contact 1 twitter',
          instagram: 'contact 1 instagram',
          github: 'contact 1 github'
        },
        {name: 'test contact 2'},
      ]);
    });
};
