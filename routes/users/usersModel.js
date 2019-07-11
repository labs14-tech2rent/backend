const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getUserById,
    addUser, 
    updateUser, 
    deleteUser
}

function getAll() {
    return db('users');
}

async function addUser(newUser) {

    const [id] = await db('users').insert(newUser);
    return getUserById(id); 
}

function getUserById(id) {
    return db('users').where({id}).first();
}