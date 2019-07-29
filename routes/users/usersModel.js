const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getAllByIds,
  getUserById,
  addUser,
  getUserByUsername,
  update,
};

function getAll() {
  return db('users');
}

function getAllByIds() {
  return db('users')
    .select('auth0_user_id')
    .select('id');
}

function addUser(newUser) {
  return db('users')
    .insert(newUser, 'id')
    .then(res => getUserById(res[0]));
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserByUsername(filter) {
  return db('users').where(filter);
}

function update(id, changes) {
  const id1 = id;
  return getAll()
    .where({ id })
    .update(changes, '*')
    .then(() => getUserById(id1));
}

