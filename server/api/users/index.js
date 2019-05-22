'use strict';

const express = require('express');
const User = require('../../database/models/User');

const router = express.Router();

router.get('/profile', (req, res) => {
  if (req.query.user) {
    new User ({id: req.query.user})
    .fetch({withRelated: ['contacts']})
    .then((profile) => {
      return res.json(profile);
    })
    .catch((error) => {
      console.log(error);
    });
  }
})
.put('/users', (req,res) => {
  if (req.query.user) {
    new User ({id: req.query.user})
    .save({
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
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
});

module.exports = router;