const supertest = require('supertest');

const server = require('./server.js');
const itemsRouter = require('../routes/items/itemsRouter');
const usersRouter = require('../routes/users/usersRouter');

describe('tests for endpoints', () => {
  describe('get /', () => {
    it('test for / endpoint, responds with 200 OK', () =>
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

  findUser - endpoint;
  describe('findUser', () => {
    it('responds with 200 OK and a user object', () => {
      supertest(server)
        .post('/users/findUser')
        .send({ auth0_user_id: 'fake |130100' })
        .expect(200);
    });
  });

  describe('get all items from db', () => {
    it('responds with the code 200 OK and returns all items from db', () => {
      supertest(itemsRouter)
        .get('/api/items')
        .expect(200);
    });
  });

  describe('get all users id', () => {
    it('responds with the code 200 OK and returns a list of all users ids', () => {
      supertest(usersRouter)
        .get('/api/users/userIDs')
        .expect(200);
    });
  });

  describe('get all users router', () => {
    it('responds with the code 200 OK and returns list of all users from unprotected route', () => {
      supertest(usersRouter)
        .get('/api/users/unprotected')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
