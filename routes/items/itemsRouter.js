const router = require('express').Router();
const knex = require('knex');
const itemsModel = require('./itemsModel');
const restricted = require('../auth/authMiddleware');

// Unprotected routers

router.get('/', async (req, res) => {
  try {
    const allItems = await itemsModel.getAll();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await itemsModel.updateItem(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itemCount = await itemsModel.deleteItem(id);
    if (!itemCount || itemCount < 1) {
      res.status(404).json({ message: 'Item was not found to be removed' });
    } else {
      res.status(200).json(itemCount);
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        'There was an error while trying to delete an item from the data base',
    });
  }
});

router.post('/searchCategory', async (req, res) => {
  try {
    console.log(req.body, 'something somethign');
    const category = req.body;
    const items = await itemsModel.getItemByCategory(category);
    console.log(category, 'aaaaaaaaaaaa');
    console.log(items, 'bbbbbbbbbb');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error, 'something');
  }
});

router.post('/searchCondition', async (req, res) => {
  try {
    console.log(req.body, 'just testing');
    const condition = req.body;
    const items = await itemsModel.getItemByCondition(condition);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error, 'something');
  }
});

router.post('/searchZipCode', async (req, res) => {
  try {
    console.log(req.body, 'just testing');
    const zipcode = req.body;
    const items = await itemsModel.getItemByZipCode(zipcode);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error, 'something');
  }
});

router.post('/searchCity', async (req, res) => {
  try {
    // console.log(req.body, 'just testing');
    let location = req.body;
    // console.log(Object.values(location)[0]);
    const cityName = Object.values(location)[0];
    const blah = cityName.substring(0, 1);
    blah.toUpperCase();
    // console.log(blah.toUpperCase());
    // console.log(typeof blah);
    const testString = cityName.slice(1);
    // console.log(testString);
    const newString = blah.toUpperCase() + testString;
    Object.values(location)[0] = newString;
    location = { ...location, city: newString };
    const items = await itemsModel.getItemByCity(location);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error, 'something');
  }
});

module.exports = router;
