const express = require("express");
const db = require("../data/dbConfig");

const server = express();

const helmet = require("helmet");
const cors = require("cors");

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const Auth0Strategy = require("passport-auth0");
const passport = require("passport");
const session = require("express-session");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();

const strategy = new Auth0Strategy(
  {
    domain: "dev-gco3gwsp.auth0.com",
    clientID: "nQaekaDksMqSatuhNoVbjBYNItSAGTiO",
    clientSecret:
      "EeID-Z3gpRKOkSWRDU311AqIaIzWHzdCYaAXU4-XUOwHqSTm75f2vkUEUHcUwCYm",
    callbackURL: "/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
passport.use(strategy);

// middleware that serializes the user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// middleware that deserializes user's info
passport.deserializeUser((user, done) => {
  done(null, user);
});

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
  session({ secret: "shhhhhhhhh", resave: true, saveUninitialized: true })
);
server.use(passport.initialize());
server.use(passport.session());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

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

//Routes

//User
const userRoutes = require("../routes/users/usersRouter");
server.use("/api/users", userRoutes);

//Auth
const authRoutes = require("../routes/auth/authRouter");
server.use("/api/auth", authRoutes);

server.get("/test", ensureLoggedIn, (req, res) => {
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

server.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid profile" }),
  function(req, res) {
    res.redirect("/");
  }
);

server.get(
  "/login/google",
  passport.authenticate("auth0", { connection: "google-oauth2" }),
  function(req, res) {
    res.redirect("/");
  }
);

module.exports = server;
