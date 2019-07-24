const bcrypt = require('bcryptjs');

const faker = require('faker');

const users = [];
function generateUsers() {

  for (let id = 1; id <= 10; id++) {
    let firstName = faker.name.firstName();
    let profilePicture = faker.image.avatar();
    let phoneNumber = faker.phone.phoneNumber();
    let dateOfBirth = faker.date.past();
    let paymentType = 'Amex Black Card';
    let addressStreet = faker.address.streetAddress();
    let addressCity = faker.address.city();
    let addressState = faker.address.stateAbbr();
    let addressZipCode = faker.address.zipCode();
    let averageRating = 5.7;
    let email = faker.internet.email();
    users.push({
      auth0_user_id: 'fake |' + Math.floor(Math.random() * 999) + 100,
      email: email,
      name: firstName + Math.floor(Math.random() * 999) + 100,
      profile_picture: profilePicture,
      phone: phoneNumber,
      date_of_birth: dateOfBirth,
      preferred_payment_type: paymentType,
      street: addressStreet,
      city: addressCity,
      state: addressState,
      zip_code: addressZipCode,
      average_rating: averageRating,
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
