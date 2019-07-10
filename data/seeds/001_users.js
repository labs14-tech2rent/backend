
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'User1'},
        {id: 3, username: 'User3'},
        {id: 2, username: 'User2'},
      ]);
    });
};
