exports.up = function(knex) {
  return knex.schema.createTable('renter_table', function(tbl) {
    tbl.increments();
    tbl
      .integer('item_id', 255)
      .references('id')
      .inTable('items')
      .notNull();
    tbl
      .integer('renter_id', 255)
      .references('id')
      .inTable('users')
      .notNull();
    tbl.decimal('offer_amount', 8, 2).notNull();
    tbl.date('date_from').notNull();
    tbl.date('date_to').notNull();
    tbl.boolean('rent_agree');
    tbl.boolean('returned');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('renter_table');
};
