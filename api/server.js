const express = require("express");
const db = require("../data/dbConfig");

const server = express();

const helmet = require("helmet");
const cors = require("cors");

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

server.use(helmet());
server.use(express.json());
server.use(cors());

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

server.get("/test", checkJwt, (req, res) => {
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
