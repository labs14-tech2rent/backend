
const router = require('express').Router();
const knex = require('knex');
const db = require('../../data/dbConfig');
const usersModel = require('./usersModel'); 


router.get("/",  async (req, res) => {
    try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;