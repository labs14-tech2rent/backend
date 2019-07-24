const express = require("express");
const dataBase = require("../data/dbConfig");
const passport = require('passport');
const passportSetup = require('../config/passport-setup');


const server = express();

const helmet = require('helmet');
const cors = require('cors');

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(passport.initialize());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});


// Routes

// User

const userRoutes = require('../routes/users/usersRouter');
server.use('/api/users', userRoutes);

//Items
const itemsRoutes = require('../routes/items/itemsRouter');
server.use('/api/items', itemsRoutes);

// Auth
const authRoutes = require("../routes/auth/authRouter");

server.use("/api/auth", authRoutes);

server.get("/test", (req, res) => {
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

  console.log('user from /test', res.req.user);
});


module.exports = server;
