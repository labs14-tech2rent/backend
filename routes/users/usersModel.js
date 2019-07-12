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

    const [id] = db('users').insert(newUser);
    return await getUserById(id); 
}

function getUserById(id) {
    return db('users').where({id}).first();
}

function getUserByUsername(filter) {
    return db('users').where(filter)
}