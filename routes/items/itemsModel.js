const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getItemById,
  updateItem,
  deleteItem,
  getItemByCategory,
  getItemByCondition,
  getItemByZipCode,
  getItemByCity,
};

function getAll() {
  return db('items');
}

function getItemById(id) {
  return db('items')
    .where({ id })
    .first();
}

async function updateItem(id, updatedItem) {
  const updated = await getItemById(id).update(updatedItem);
  return updated;
}

function deleteItem(id) {
  return db('items')
    .where({ id })
    .delete();
}

function getItemByCategory(category) {
  return db('items').where(category);
}

function getItemByCondition(condition) {
  return db('items').where(condition);
}

function getItemByZipCode(zipcode) {
  return db('items').where(zipcode);
}

function getItemByCity(city) {
  return db('items').where(city);
}
