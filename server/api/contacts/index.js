'use strict';

const express = require('express');
const Contact = require('../../database/models/Contact');
const router = express.Router();

router.route('/')
.get((req, res) => {
  console.log('/contacts get request');
  if (req.query.user){
    console.log(req.query.user);
    new Contact()
    .where({created_by: req.query.user})
    .fetchAll({withRelated: 'user'})
    .then((contacts) => {
      return res.json(contacts);
    })
    .catch((error) => {
      console.log(error);
    })
  }
})
.post((req,res) => {
  console.log('/contacts post request');
  return new Contact()
  .save({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    work: req.body.work,
    home: req.body.home,
    email: req.body.email,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    github: req.body.github,
    created_by: req.body.created_by,
  })
  .then((newContact) => {
    res.json(newContact);
  })
  .catch((error) => {
    console.log(error);
  });
});

router.route('/search/:term')
.get((req, res) => {
  console.log('/search/:term get request');
  if (req.query.user){
    new Contact()
    .where({created_by: req.query.user})
    .where('name', 'ilike', req.params.term.concat('%'))
    .fetchAll({withRelated: 'user'})
    .then((contacts) => {
      return res.json(contacts);
    })
    .catch((error) => {
      console.log(error);
    })
  }
})

router.route('/:id')
.get((req, res) => {
  console.log('/contacts/id get request');
  new Contact()
  .where({id: req.query.id})
  .fetch({withRelated: 'user'})
  .then((contact) => {
    return res.json(contact);
  })
  .catch((error) => {
    console.log(error);
  })
})

module.exports = router;