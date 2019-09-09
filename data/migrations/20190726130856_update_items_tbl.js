exports.up = function(knex) {
  return knex.schema.table('items', function(tbl) {
    tbl.string('condition', 128);
    tbl.string('sub_category', 50);
    tbl.string('city', 255);
    tbl.string('state', 255);
    tbl.string('zipcode', 12);
  });
};

exports.down = function(knex) {
  return knex.schema.table('items', function(tbl) {
    tbl.dropColumns('city', 'state', 'zipcode', 'condition', 'sub_category');
  });
};
