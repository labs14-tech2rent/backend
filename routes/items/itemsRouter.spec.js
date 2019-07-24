const supertest = require('supertest');

const itemsRouter = require('./itemsRouter');

describe('itemsRouter', () => {

    describe('get all items from db', () => {
        it('responds with the code 200 OK', () => {
            return supertest(itemsRouter)
                .get('/')
                .expect(200);
        })
    });


});