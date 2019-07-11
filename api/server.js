const express = require("express");
const db = require("../data/dbConfig");


const server = express();

const helmet = require("helmet");
const cors = require("cors");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});


//Routes
const userRoutes = require('../routes/users/usersRouter');

server.use('/api/users', userRoutes);


server.get("/test", (req, res) => {
  let testData = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ];
  res.status(200).json(testData);
});

module.exports = server;
