const bcrypt = require('bcryptjs');

const faker = require('faker');

const users = [];
function generateUsers() {
<<<<<<< HEAD
  for (let id = 1; id <= 499; id++) {
    let firstName = faker.name.firstName();
=======
  for (let id = 1; id <= 500; id++) {
    const firstName = faker.name.firstName();
>>>>>>> master
    users.push({
      username: firstName + Math.floor(Math.random() * 999) + 100,
      password: bcrypt.hashSync('password', 8),
    });
  }
}
generateUsers();

exports.seed = function(knex) {
  // Deletes ALL existing entries
<<<<<<< HEAD
  return knex("users")

=======
  return knex('users')
    .truncate()
>>>>>>> master
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
