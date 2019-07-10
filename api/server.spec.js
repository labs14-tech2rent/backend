const supertest = require("supertest");

const server = require("./server.js");

describe("server", () => {
  describe("get /", () => {
    it("responds with 200 OK", () => {
      return supertest(server)
        .get("/")
        .expect(200);
    });
  });

  describe("get testdata from /test", () => {
    it("responds with 200 OK and a list of numbers", () => {
      return supertest(server)
        .get("/test")
        .expect([
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
          "ten"
        ]);
    });

    describe('get test users from the users table', () => {
      it('responds with 200 and shows a list of users', () => {
        return supertest(server)
          .get('/users')
          .expect(
            [
              {
              "id": 1,
              "username": "User1"
              },
              {
              "id": 2,
              "username": "User2"
              },
              {
              "id": 3,
              "username": "User3"
              }
              ]
          )
      })
    })
  });
});
