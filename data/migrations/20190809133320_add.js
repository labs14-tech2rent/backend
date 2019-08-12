exports.up = function(knex) {
  return knex.schema.table('users', function(tbl) {
    tbl.string('user_bio', 255);
    tbl.string('title', 128);
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(tbl) {
    tbl.dropColumns('user_bio');
    tbl.dropColumns('title');
  });
};
