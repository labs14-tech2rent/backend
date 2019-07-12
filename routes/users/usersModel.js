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

async function addUser(newUser) {

    const res = await db('users').insert(newUser, 'id');
    return getUserById(res);
    
}

function getUserById(id) {
    return db('users').where({id}).first();
}

function getUserByUsername(filter) {
    return db('users').where(filter)
}