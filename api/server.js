const express = require("express");
const db = require("../data/dbConfig");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const dotenv = require("dotenv");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();

dotenv.config();

//const passportSetup = require('../config/passport-setup');

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:5000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const server = express();

/*
server.use(helmet());
server.use(express.json());
server.use(cors());
*/

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(
  session({
    secret: "shh",
    resave: true,
    saveUninitialized: true
  })
);
server.use(passport.initialize());
server.use(passport.session());

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || "http://localhost:5000/callback"
};

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/login", passport.authenticate("auth0", {}), function(req, res) {
  res.redirect("/");
});

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Routes

//User
const userRoutes = require("../routes/users/usersRouter");
server.use("/api/users", userRoutes);

//Auth
const authRoutes = require("../routes/auth/authRouter");
server.use("/api/auth", authRoutes);

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
