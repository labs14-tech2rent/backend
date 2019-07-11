const supertest = require('supertest');

const usersRouter = require('./usersRouter');

describe('usersRouter', () => {

    describe('get all users router', () => {
        it('responds with the code 200 OK', () => {
            return supertest(usersRouter)
                .get('/')
                .expect(200);
        })
    });


});