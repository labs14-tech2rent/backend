
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_reviews')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_reviews').insert([
        {
          user_id: 1,
          reviewer_id: 2,
          rating: 4.5,
          review_title: "Great Job",
          review_body: "Love this user so much! Excellent work and great service. Always rent things from him"

        },
        {
          user_id: 1,
          reviewer_id: 3,
          rating: 4.0,
          review_title: "Very Good",
          review_body: "Love this user so much! Excellent work and great service. Always rent things from him"
        },
        {
          user_id: 1,
          reviewer_id: 3,
          rating: 5.0,
          review_title: "Amazing",
          review_body: "Love this user so much! Excellent work and great service. Always rent things from him"
        },

        {
          user_id: 2,
          reviewer_id: 3,
          rating: 5.0,
          review_title: "Amazing",
          review_body: "Love this user so much! Excellent work and great service. Always rent things from him"
        },

        {
          user_id: 2,
          reviewer_id: 3,
          rating: 5.0,
          review_title: "Amazing",
          review_body: "Love this user so much! Excellent work and great service. Always rent things from him"
        }
      ]);
    });
};
