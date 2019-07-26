const knex = require('knex');
const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getItemById,
    updateItem
}

function getAll() {
    return db('items');
}

function getItemById(id) {
    return db('items').where({id}).first();
}

async function updateItem(id, updatedItem) {
    const updated = await getItemById(id).update(updatedItem);
    return updated;
}
