
exports.up = function(knex) {
    return knex.schema.createTable('users_reviews', tbl => {
        tbl
            .increments();

        tbl
            .integer('user_id', 255)
            .references('id').inTable('users').notNull();

        tbl
            .integer('reviewer_id', 255)
            .notNull();

        tbl
            .decimal('rating', 8, 2);
        
        tbl
            .string('review_title', 255);
        
        tbl
            .string('review_body', 255);    
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_reviews');
};
