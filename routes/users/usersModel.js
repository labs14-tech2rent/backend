const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getUserById,
    addUser, 
    // updateUser, 
    // deleteUser,
    getUserByUsername,
}

function getAll() {
    return db('users');
}

function addUser(newUser) {

    return db('users').insert(newUser, 'id')
        .then(res => {
            return getUserById(res)
        });
    
}

function getUserById(id) {
    return db('users').where({id}).first();
}

function getUserByUsername(filter) {
    return db('users').where(filter)
}