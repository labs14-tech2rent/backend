const router = require('express').Router();
const knex = require('knex');
const AWS = require('aws-sdk');
const listAllObjects = require('s3-list-all-objects');
const itemsModel = require('./itemsModel');
const restricted = require('../auth/authMiddleware');

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
    console.log(params, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
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

// List Objects

const s3Test = new AWS.S3({
  accessKeyId: S3_IAM_USER_KEY,
  secretAccessKey: S3_IAM_USER_SECRET,
  // Bucket: S3_BUCKET_NAME,
});

const params = {
  Bucket: S3_BUCKET_NAME,
  MaxKeys: 1000,
};
// Unprotected routers

const s3options = {
  accessKeyId: S3_IAM_USER_KEY,
  secretAccessKey: S3_IAM_USER_SECRET,
};

router.get('/', async (req, res) => {
  try {
    const allItems = await itemsModel.getAll();
    res.status(200).json(allItems);

    s3Test.listObjectsV2(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
    /*
    s3Test.listBuckets(function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
    */
    /*
    listAllObjects({ bucket: S3_BUCKET_NAME, s3options }, function(err, data) {
      console.log(data);
    });
    */
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleItem = await itemsModel.getItemById(req.params.id);
    res.status(200).json(singleItem);
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

router.post('/uploadProfilePicture', async (req, res) => {
  const file = req.files.name;
  const randomNum =
    Math.floor(Math.random() * 1000000 + 1) -
    Math.floor(Math.random() * 10000 + 1);
  file.name = `${randomNum}`;
  console.log(file.name, '444444444444444');
  console.log(file.key);
  // console.log(file1, 'BABABABABAB');
  console.log(file, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  uploadToS3(file, res);
});

module.exports = router;
