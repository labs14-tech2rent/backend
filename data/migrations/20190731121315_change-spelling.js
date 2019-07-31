exports.up = function(knex) {
  return knex.schema.table('items', function(table) {
    table.dropColumn('avarage_raiting');
  });
};

exports.down = function(knex) {
  return knex.schema.table('items', function(tbl) {
    tbl.decimal('avarage_raiting', 8, 2);
  });
};
