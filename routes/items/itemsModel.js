const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getItemById
}

function getAll() {
    return db('items');
}

function getItemById(id) {
    return db('items').where({id}).first();
}
