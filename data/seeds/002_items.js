
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          users_ownerId: 1,
          name: "APEMAN Trail Camera 16MP 1080P Wildlife Camera, Night Detection Game Camera with No Glow 940nm IR LEDs, Time Lapse, Timer, IP66 Waterproof Design",
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
          name: "APEMAN Trail Camera 16MP 1080P Wildlife Camera, Night Detection Game Camera with No Glow 940nm IR LEDs, Time Lapse, Timer, IP66 Waterproof Design",
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
          name: "APEMAN Trail Camera 16MP 1080P Wildlife Camera, Night Detection Game Camera with No Glow 940nm IR LEDs, Time Lapse, Timer, IP66 Waterproof Design",
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
