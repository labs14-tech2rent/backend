const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const usersModel = require('../routes/users/usersModel');
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.getUserById(id);
    done(null, user)
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/test',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {

        console.log('profile', profile);
   
        const allUsers = await usersModel.getAll();
        let currentUser;

        const newUser = {
            username: profile._json.email,
            password: profile.id
        }

        allUsers.forEach(async user => {
            if(user.username === profile._json.email) {
                currentUser = await usersModel.getUserById(user.id);
                console.log('curentuser', currentUser);
                done(null, currentUser)  
            }
        })

        if(!currentUser) {
            await usersModel.addUser(newUser);
            const updatedUsers = await usersModel.getAll();
            console.log(updatedUsers[updatedUsers.length-1]);
            done('new user', updatedUsers[updatedUsers.length-1]);
        }

        
    })
)

