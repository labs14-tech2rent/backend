const express = require("express");
const db = require("../data/dbConfig");
const server = express();
const lc = require("localStorage");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const Auth0Strategy = require("passport-auth0");
const passport = require("passport");
const session = require("express-session");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config();

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL ||
      "https://labstech2rentstaging.herokuapp.com/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /*
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
     
    //localStorage.setItem('myFirstKey', 'myFirstValue');
    localStorage.setItem('jwt', extraParams.id_token);
    */
    return done(null, { profile: profile, token: extraParams.id_token });
  }
);

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL ||
    "https://labstech2rentstaging.herokuapp.com/callback"
};

passport.use(strategy);

// middleware that serializes the user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// middleware that deserializes user's info
passport.deserializeUser((user, done) => {
  //console.log(user);
  done(null, user);
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
  session({ secret: "shhhhhhhhh", resave: true, saveUninitialized: true })
);
server.use(passport.initialize());
server.use(passport.session());

server.get("/", (req, res) => {
  /*
    if (res.req.user.profile.displayName == 3) {
    const token = res.req.user.profile.displayName;
    console.log(token);
    console.log(res.req.user, "BBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    res.status(200).json({ api: "up", profile: token });
    return res.user;
  } else {
    
  }
    */
  res.status(200).json({ api: "up" });
});

/*
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-gco3gwsp.auth0.com/.well-known/jwks.json`
  }),

  audience: "YOUR_API_IDENTIFIER",
  issuer: `https://dev-gco3gwsp.auth0.com/`,
  algorithms: ["RS256"]
});
*/

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

server.get(
  "/callback",
  passport.authenticate("auth0", { failureRedirect: "/login" }),
  function(req, res) {
    if (!req.user) {
      throw new Error("user null");
    }
    res.redirect("/");
  }
);

server.get("/login", passport.authenticate("auth0", {}), function(req, res) {
  res.redirect("/");
});

server.get(
  "/login/google",
  passport.authenticate("auth0", { connection: "google-oauth2" }),
  function(req, res) {
    res.redirect("/");
  }
);

server.get("/logout", (req, res) => {
  // For the logout page, we don't need to render a page, we just want the user to be logged out when they hit this page. We'll use the ExpressJS built in logout method, and then we'll redirect the user back to the homepage.
  req.logout();
  res.redirect("/");
});

module.exports = server;
