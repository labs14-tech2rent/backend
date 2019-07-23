const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const usersModel = require('../users/usersModel');
const secret = require('../../config/secret');

// Auth with google

router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}));

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  usersModel
    .addUser(user)

    .then(saved => {
      console.log('saved', saved);
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  usersModel
    .getUserByUsername({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['user'],
  };

  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
