const bcrypt = require('bcryptjs');

const faker = require('faker');

const users = [];
function generateUsers() {
  for (let id = 1; id <= 10; id++) {
    const firstName = faker.name.firstName();
    const profilePicture = faker.image.avatar();
    const phoneNumber = faker.phone.phoneNumber();
    const dateOfBirth = faker.date.past();
    const paymentType = 'Amex Black Card';
    const addressStreet = faker.address.streetAddress();
    const addressCity = faker.address.city();
    const addressState = faker.address.stateAbbr();
    const addressZipCode = faker.address.zipCode();
    const averageRating = 5.7;
    const email = faker.internet.email();
    users.push({
      auth0_user_id: `fake |${  Math.floor(Math.random() * 999)  }${100}`,
      email,
      name: firstName + Math.floor(Math.random() * 999) + 100,
      profile_picture: profilePicture,
      phone: phoneNumber,
      date_of_birth: dateOfBirth,
      preferred_payment_type: paymentType,
      street: addressStreet,
      city: addressCity,
      state: addressState,
      zip_code: 11111,
      average_rating: averageRating,
      password: bcrypt.hashSync('password', 8),
    });
  }
}
generateUsers();

exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex('users')
    .then(function() {
    // Inserts seed entries
    return knex('users').insert(users);
  });
};
