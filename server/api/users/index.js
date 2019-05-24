'use strict';

const express = require('express');
const User = require('../../database/models/User');

const router = express.Router();

router.route('/profile')
.get((req, res) => {
  console.log('/profile get request');
  new User ({id: req.query.user})
  .fetch({withRelated: ['contacts']})
  .then((profile) => {
    return res.json(profile);
  })
  .catch((error) => {
    console.log(error);
  });
});

router.route('/users')
.put((req,res) => {
  console.log('/users put request');
  console.log('user id ', req.query.user);
  console.log('changes ', req.body);
  new User ({id: req.query.user})
  .save({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  })
  .then(() => {
    new User ({id: req.query.user})
    .fetch({withRelated: 'contacts'})
    .then((updatedUser) => {
      return res.json(updatedUser);
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;