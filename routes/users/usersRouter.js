const router = require('express').Router();
const knex = require('knex');
const db = require('../../data/dbConfig');
const usersModel = require('./usersModel');
const restricted = require('../auth/authMiddleware');

router.get('/', restricted, async (req, res) => {
  try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Unprotected routers 

router.get("/unprotected", async (req, res) => {
    try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/:id/items', async(req, res) => {
    try {
        const newItem = req.body;
        const id = req.params.id;
        if(newItem.name && newItem.description) {
            const addItem = await db('items')
                .returning('id')
                .insert({...newItem, users_ownerId: id});
            console.log(addItem);
            if(addItem) {
                res.status(201).json(addItem);
            } else {
                res.status(401).json({message: "The item with provided id was not found"});
            }
        }
    }
    catch(err){
        res.status(500).json({message: "There was an error while trying to add an item in the data base"});
    }
  });

module.exports = router;
