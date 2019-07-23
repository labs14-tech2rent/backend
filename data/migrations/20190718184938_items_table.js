
exports.up = function(knex) {
    return knex.schema.createTable('items', tbl => {
        tbl
            .increments();

        tbl
            .integer('users_ownerId', 255)
            .references('id').inTable('users').notNull();

        tbl
            .string('name', 255)
            .notNull();

        tbl
            .decimal('price', 8, 2)
            .notNull();
        
        tbl
            .string('picture', 255);
        
        tbl
            .string('location', 255);
                
        tbl
            .string('category', 255);
           
        tbl
            .string('description', 255);

        tbl
            .boolean('available', 255);
        
        tbl
            .string('payment_type', 255);

        tbl
            .decimal('avarage_raiting', 8, 2);
        
          
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('items');
};
