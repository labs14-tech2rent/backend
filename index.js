const express = require('express');
const helmet = require('helmet');

const server = require('./api/server.js');

server.use(express.json());
server.use(helmet());

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} ** \n`));
