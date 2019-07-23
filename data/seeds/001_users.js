const bcrypt = require('bcryptjs');

const faker = require('faker');

const users = [];
function generateUsers() {

  for (let id = 1; id <= 499; id++) {
    let firstName = faker.name.firstName();

    users.push({
      username: firstName + Math.floor(Math.random() * 999) + 100,
      password: bcrypt.hashSync('password', 8),
    });
  }
}
generateUsers();

exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex("users")


    .then(function() {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
