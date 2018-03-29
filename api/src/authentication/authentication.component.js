import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import User from '../user/user.model';

const router = express.Router();

router.get('/foo', (req, res) => res.send('foobar'));

router.post('/register', (req, res) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      console.log(err);
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

module.exports = router;
