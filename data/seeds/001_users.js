const bcrypt = require('bcryptjs');

const faker = require("faker");
let users = [];
function generateUsers() {
  for (let id = 1; id <= 500; id++) {
    let firstName = faker.name.firstName();
    users.push({
      id: id,
      username: firstName + Math.floor(Math.random() * 999) + 100,
      password: bcrypt.hashSync('password', 8)
    });
  }
}
generateUsers();

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(users);
    });
};
