exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('auth0_user_id', 255)
      .notNullable()
      .unique();

    tbl.string('email', 255).notNullable();

    tbl.string('name', 128).notNullable();

    tbl.string('profile_picture', 255);

    tbl.string('phone', 255);

    tbl.string('date_of_birth', 255);

    tbl.string('preferred_payment_type', 255);

    tbl.string('street', 255);

    tbl.string('city', 255);

    tbl.string('state', 255);

    tbl.integer('zip_code', 6);

    tbl.decimal('average_rating', 8, 2);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
