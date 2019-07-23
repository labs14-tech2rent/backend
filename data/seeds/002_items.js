
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          users_ownerId: 1,
          name: "Trail Wildlife Camera",
          price: 20.00,
          picture: "https://ae01.alicdn.com/kf/HTB1Brc7QFXXXXbFXVXXq6xXFXXXX.jpg",
          location: "Philadelphia, PA",
          category: "Cameras",
          description: "Trail cameras are fit for hunters and wildlife enthusiasts alike. These motion-activated cameras capture images day or night, whenever an animal passes into the field of view.",
          available: 1,
          payment_type: "Online",
          avarage_raiting: 4.5

        },
        {
          users_ownerId: 1,
          name: "Trail Wildlife Camera",
          price: 20.00,
          picture: "https://ae01.alicdn.com/kf/HTB1Brc7QFXXXXbFXVXXq6xXFXXXX.jpg",
          location: "Philadelphia, PA",
          category: "Cameras",
          description: "Trail cameras are fit for hunters and wildlife enthusiasts alike. These motion-activated cameras capture images day or night, whenever an animal passes into the field of view.",
          available: 1,
          payment_type: "Online",
          avarage_raiting: 4.5,


        },
        {
          users_ownerId: 1,
          name: "Trail Wildlife Camera",
          price: 20.00,
          picture: "https://ae01.alicdn.com/kf/HTB1Brc7QFXXXXbFXVXXq6xXFXXXX.jpg",
          location: "Philadelphia, PA",
          category: "Cameras",
          description: "Trail cameras are fit for hunters and wildlife enthusiasts alike. These motion-activated cameras capture images day or night, whenever an animal passes into the field of view.",
          available: 1,
          payment_type: "Online",
          avarage_raiting: 4.5
        }
      ]);
    });
};
