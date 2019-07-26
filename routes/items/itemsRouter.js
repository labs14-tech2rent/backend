
const router = require('express').Router();
const knex = require('knex');
const itemsModel = require('./itemsModel'); 
const restricted = require('../auth/authMiddleware');

//Unprotected routers 

router.get("/", async (req, res) => {
    try {
    const allItems = await itemsModel.getAll();
    res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const updated = await itemsModel.updateItem(req.params.id, req.body);
        res.status(200).json(updated);
    }
    catch(err) {
        res.status(500).json(err);
    }
})




module.exports = router;