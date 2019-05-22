'use strict';

const express = require('express');
const User = require('../../database/models/User');

const router = express.Router();

router.route('/login')
.post((req, res) => {
  console.log('/login post request');
  res.send('Login OK');
});

router.route('/logout')
.post((req, res) => {
  console.log('/logout post request');
  res.send('Logout OK');
});

router.route('/register')
.post((req, res) => {
  console.log('/register post request, ', req.body);
  new User()
  .save({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  })
  .then(() => {
    res.send('Register OK');
  })
});

module.exports = router;
