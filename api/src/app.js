import express from 'express';
import mongoose from 'mongoose';
import busboy from 'express-busboy';
import passport from 'passport';
import jwt from 'express-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './user/user.model';

import PlantComponent from './plant/plant.component';
import NoteComponent from './note/note.component';
import ActivityComponent from './activity/activity.component';
import AuthComponent from './authentication/authentication.component';

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const PORT = process.env.PORT || 8080;

busboy.extend(app, {
  upload: true,
  path: './public/images/plants/',
  allowedPath: /./
});

app.use(passport.initialize());
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);

app.get('/', (req, res) => res.send('Plants API'));
app.use('/api/auth', AuthComponent);
app.use('/api/plants', PlantComponent);
app.use('/api/plants/:id/notes', NoteComponent);
app.use('/api/plants/:id/activities', ActivityComponent);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  }
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
