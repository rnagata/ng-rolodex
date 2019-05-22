'use strict';

const express = require('express');
const User = require('../../database/models/User');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.user) {
    return new User ({id: req.query.user})
    .fetch({withRelated: ['contacts']})
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }
});

module.exports = router;