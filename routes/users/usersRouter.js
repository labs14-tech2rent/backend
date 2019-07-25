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

router.get('/userIDs', async (req, res) => {
  try {
    const userIDs = await usersModel.getAllByIds();
    res.status(200).json(userIDs);
  } catch (error) {
    res.status(500).json(error);
  }
})

//Unprotected routers 

//GET ALL USERS
router.get("/unprotected", async (req, res) => {
    try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});


//ADD NEW ITEM FOR THE USER
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

//GET USER BY ID WITH ALL REVIEWS THAT HAVE BEEN SUBMITED ABOUT HIM
router.get('/:id/reviews', async(req, res) => {
    try {
        const id = req.params.id;
        const user = await usersModel.getUserById(id);
        const reviews = await db('users_reviews').where({user_id: id})
        console.log('user', user)

        res.status(200).json({...user, reviews})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "There was an error while trying to retrieve a user from the data base"});
    }
});

module.exports = router;
