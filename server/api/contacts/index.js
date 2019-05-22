'use strict';

const express = require('express');
const Contact = require('../../database/models/Contact');
const router = express.Router();

router.route('/')
.get((req, res) => {
  if (req.query.user){
    new Contact({id: req.query.user})
    .fetch({withRelated: 'user'})
    .then((contact) => {
      return res.json(contact);
    })
  }
});

module.exports = router;