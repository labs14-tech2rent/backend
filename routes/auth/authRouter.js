const authRouter = require('express').Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../users/usersModel');
const secret = require('../../config/secret');
