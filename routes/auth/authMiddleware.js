const jwt = require('jsonwebtoken');

const userModel = require('../users/usersModel');
const secret = require('../../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ mesagge: 'No token provided' });
  }
};
