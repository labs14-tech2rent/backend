const router = require('express').Router();
const knex = require('knex');
const AWS = require('aws-sdk');
const db = require('../../data/dbConfig');
const usersModel = require('./usersModel');
const restricted = require('../auth/authMiddleware');
const itemsModel = require('../items/itemsModel');

const { S3_BUCKET_NAME } = process.env;
const { S3_IAM_USER_KEY } = process.env;
const { S3_IAM_USER_SECRET } = process.env;

// UPLOAD TO S3 BUCKET
const uploadToS3 = (file, res) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: S3_IAM_USER_KEY,
    secretAccessKey: S3_IAM_USER_SECRET,
    Bucket: S3_BUCKET_NAME,
  });
  console.log(s3Bucket.Bucket);
  s3Bucket.createBucket(() => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file.name,
      ContentType: file.name.mimetype,
      Body: file.data,
    };

    s3Bucket.upload(params, (err, data) => {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
      res.status(200).json(data);
    });
  });
};

router.get('/', restricted, async (req, res) => {
  try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Unprotected routers

// GET ALL USERS
router.get('/unprotected', async (req, res) => {
  try {
    const testUsers = await usersModel.getAll();
    res.status(200).json(testUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD NEW ITEM FOR THE USER
router.post('/:id/items', async (req, res) => {
  try {
    const newItem = req.body;
    const { id } = req.params;
    console.log(req.body);
    console.log(newItem);
    if (newItem.name && newItem.description) {
      const addItem = await db('items')
        .returning('id')
        .insert({ ...newItem, users_ownerId: id });
      // console.log(addItem);
      if (addItem) {
        res.status(201).json(addItem);
      } else {
        res
          .status(401)
          .json({ message: 'The item with provided id was not found' });
      }
    }
  } catch (err) {
    res.status(500).json({
      message:
        'There was an error while trying to add an item in the data base',
      err,
    });
    console.log(err);
  }
});

// GET USER BY ID WITH ALL REVIEWS THAT HAVE BEEN SUBMITED ABOUT HIM
router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.getUserById(id);
    const reviews = await db('users_reviews').where({ user_id: id });
    console.log('user', user);

    res.status(200).json({ ...user, reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        'There was an error while trying to retrieve a user from the data base',
    });
  }
});

// Get USER, USER REVIEWS, USER ITEMS by ID

router.get('/:id', async (req, res) => {
  try {
    const users = await usersModel.getUserById(req.params.id);
    const usersItems = await itemsModel.getItemsByUsersId(req.params.id);
    res.status(200).json({ ...users, usersItems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'We ran into an error' });
  }
});

// GET USER BY ID
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const users = await usersModel.update(req.params.id, req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error);
  }
});

router.post('/testBody2', async (req, res) => {
  try {
    console.log(req, 'AAAA');
    console.log(req.body, 'BBBBBB');
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error, 'CCCCC');
  }
});

router.post('/findUser', async (req, res) => {
  try {
    console.log(req);
    console.log(req.body, 'aaaaaaaaaaaaa');
    const regex = /%7C/gi;
    const string = req.body.auth0_user_id;
    console.log(string, 'bbbbbbb');

    if (string.match(regex)) {
      console.log(string.replace('%7C', '|'), 'ccccccccccc');
      console.log(string.match(regex), 'ddddddddddddd');
      const a = string.replace('%7C', '|');
      req.body.auth0_user_id = a;
      console.log(req.body, 'eeeeeeeeeee');
    }

    const users = await usersModel.getUserByUsername(req.body);
    console.log(req.body, 'fffffffffffffffff');
    if (
      Object.entries(req.body).length === 0 ||
      Object.entries(users).length === 0
    ) {
      res.status(200).json({ message: 'User not found' });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error' });
    console.log(error, 'ggggggggggggggg');
  }
});

// GET THE LIST OF USER IDS
router.get('/fix/userIDs', async (req, res) => {
  try {
    const userIDs = await usersModel.getAllByIds();
    console.log(userIDs);
    res.status(200).json(userIDs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/uploadProfilePicture', async (req, res) => {
  const file = req.files.name;
  console.log(file);
  uploadToS3(file, res);
});

module.exports = router;
