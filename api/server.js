const express = require("express");
const db = require('../data/dbConfig');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get('/users', async (req, res) => {
  const testUsers = await db('users')
  res.status(200).json(testUsers);
})

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
