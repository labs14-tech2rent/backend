exports.up = function(knex) {
  return knex.schema.table('items', function(tbl) {
    tbl.decimal('average_rating', 8, 2);
  });
};

exports.down = function(knex) {
  return knex.schema.table('items', function(tbl) {
    tbl.dropColumns('average_rating');
  });
};
