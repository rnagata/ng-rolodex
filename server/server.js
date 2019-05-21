const express = require('express');
const Contact = require('./database/models/Contact');
const User = require('./database/models/User');

const port = process.env.EXPRESS_CONTAINER_PORT;
const app = express();

app.get('/contact', (req, res) => {
  console.log('Get to contact');
  return new Contact()
  .fetchAll({withRelated: ['user']})
  .then((data) => {
    console.log(data);
    return res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.get('/user', (req, res) => {
  console.log('Get to user');
  return new User()
  .fetchAll({withRelated: ['contacts']})
  .then((data) => {
    console.log(data);
    return res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.listen(port, () => {
  console.log('Server listening on ', port);
});