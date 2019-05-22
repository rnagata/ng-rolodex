'use strict';

const express = require('express');
const Contact = require('../../database/models/Contact');
const router = express.Router();

router.route('/')
.get((req, res) => {
  if (req.query.user){
    console.log(req.query.user);
    new Contact()
    .where({created_by: req.query.user})
    .fetchAll({withRelated: 'user'})
    .then((contacts) => {
      return res.json(contacts);
    })
  }
});

router.route('/search/:term')
.get((req, res) => {
  if (req.query.user){
    new Contact()
    .where({created_by: req.query.user})
    .where('name', 'ilike', req.params.term.concat('%'))
    .fetchAll({withRelated: 'user'})
    .then((contacts) => {
      return res.json(contacts);
    })
  }
})

module.exports = router;