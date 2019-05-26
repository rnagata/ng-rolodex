'use strict';

const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');  // Session is an object representing the user being logged in.
const Redis = require('connect-redis')(session); // Library for storing session objects
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // for encrypting passwords in our database for data security.
require('dotenv').config();

const userIndex = require('./api/users/index');
const contacts = require('./api/contacts/index');

const User = require('./database/models/User');

const port = process.env.EXPRESS_CONTAINER_PORT;
const saltRounds = 12;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ // Configuration of session object.
  store: new Redis({url: process.env.REDIS_URL}), // url of redis server where session object is stored
  secret: process.env.REDIS_SECRET, // encryption password
  resave: false, // dont resave session on each access
  saveUninitialized: false // don't save session until it is used
}));
app.use(passport.initialize()); 
app.use(passport.session());

passport.use(
  new localStrategy(function(username, password, done) { // 
    console.log('calling localStrategy');
    return new User({ username: username })
    .fetch()
    .then((user) => {
      console.log(user);

      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      } else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) { 
            // bycrypt returns boolean, that if true means user and password match with database entries.
            return done(null, user);
          } else {
            // error route. username exists, pw not matched
            return done(null, false, { message: 'bad username or password' });
          }
        });
      }
    })
    .catch((err) => {
      console.log('error:', err);
      return done(err);
    });
  }),
);

// happens after local strategy is successfully done. 
// serialize method tells passport to store session object in redis database
passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username }); //session object is second parameter
});

// will fire if session id/user (in session storage) + cookie (user's) && outside of public route
// called when user enteres any route, cookie comes in from browser and is compared session store.

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  console.log(user);

  return new User({ id: user.id }).fetch().then((user) => { 
    user = user.toJSON();
    done(null, {  // gets additional info. attatches this object to every request as req.user.
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
});

// passport.serializeUser(function(user, done) {
//   console.log('serializing');
//   return done(null, { id: user.id, username: user.username });
// })

app.post('/api/register', (req, res) => {
  console.log('/register post request, ', req.body);
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) { console.log('genSalt error ', error); } //return 500

    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) { console.log('hash error ', error); } //return 500

      return new User({ // If no errors were encountered salting and hashing the password then create a new model.
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
      })
      .save() // Save model to database
      .then((newUser) => {
        console.log(newUser.toJSON());
        return res.json({message: "process complete"});
      })
      .catch((err) => {
        console.log(err);
        return res.send('Error creating account');
      });
    });
  });
  // res.json({message : 'ok'});
  // return new User()
  // .save({
  //   username: req.body.username,
  //   name: req.body.name,
  //   email: req.body.email,
  //   address: req.body.address,
  // })
  // .then(() => {
  //   res.send('Register OK');
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => { // req res function only happens if authenication suceeded
  console.log('/login post request', req.body);

  res.json({ message : 'Login Response'});
  // return new User({username: req.body.username})
  // .fetch()
  // .then((result) => {
  //   console.log(result.toJSON());
  //   const response = { username: result.toJSON().username };
  //   console.log(response);
  //   res.json({ username : result.toJSON().username});
  // });
});

app.post('/logout', (req, res) => {
  console.log('/logout post request', req.body);
  res.send('Logout OK');
});

app.use('/api/contacts', contacts);
// app.use('auth/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login.html' }), // failureFlash: true,
// );
app.use('/api', userIndex);
// app.use('/api', userAuth);

app.listen(port, () => {
  console.log('Server listening on ', port);
});