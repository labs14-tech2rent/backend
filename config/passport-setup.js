const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const passportKeys = require('./passportKeys');
require('dotenv').config()

passport.use(
    new GoogleStrategy({
        callbackURL: '/test',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    () => {})
)