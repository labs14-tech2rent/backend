const express = require('express');
// const passportSetup = require('../config/passport-setup');

const server = express();

const helmet = require('helmet');
const cors = require('cors');
const db = require('../data/dbConfig');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// Routes

// User
const userRoutes = require('../routes/users/usersRouter');

server.use('/api/users', userRoutes);

// Auth
const authRoutes = require('../routes/auth/authRouter');

server.use('/api/auth', authRoutes);

server.get('/test', (req, res) => {
  const testData = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ];
  res.status(200).json(testData);
});

module.exports = server;
