
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

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const itemCount = await itemsModel.deleteItem(id);
        if(!itemCount || itemCount < 1){
            res.status(404).json({message: "Item was not found to be removed"})
        } else{
            res.status(200).json(itemCount);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "There was an error while trying to delete an item from the data base"});
    }
}); 




module.exports = router;