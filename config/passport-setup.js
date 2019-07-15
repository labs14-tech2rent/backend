const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const passportKeys = require('./passportKeys');

passport.use(
    new GoogleStrategy({
        callbackURL: '/test',
        clientID: passportKeys.google.clientID,
        clientSecret: passportKeys.google.clientSecret
    },
    () => {})
)