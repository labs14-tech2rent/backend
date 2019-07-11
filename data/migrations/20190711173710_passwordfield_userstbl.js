
exports.up = function(knex) {
    
  return knex.schema.table('users', function(tbl) {
      tbl.string('password', 128);
  })

};

exports.down = function(knex) {
  return knex.schema.dropColumn('password');
};
