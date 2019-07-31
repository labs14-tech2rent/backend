const supertest = require('supertest');

const server = require('./server.js');

describe('server', () => {
  describe('get /', () => {
    it('responds with 200 OK', () =>
      supertest(server)
        .get('/')
        .expect(200));
  });

  describe('get testdata from /test', () => {
    it('responds with 200 OK and a list of numbers', () =>
      supertest(server)
        .get('/test')
        .expect([
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven',
          'eight',
          'nine',
          'ten',
        ]));
  });

  describe('findUser', () => {
    it('responds with 200 OK and a user object', () => {
      supertest(server)
        .post('/users/findUser')
        .send({ auth0_user_id: 'fake |130100' })
        .expect(200);
    });
  });
});
