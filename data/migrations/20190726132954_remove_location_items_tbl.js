
exports.up = function(knex) {
    return knex.schema.table('items', function (table) {
        table.dropColumn('location');
    })
};

exports.down = function(knex) {
  return knex.schema.table('items', function(tbl) {
      tbl.string('location', 255);
  })
};

