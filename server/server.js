const express = require('express');
const User = require('./database/models/User');

const port = process.env.EXPRESS_CONTAINER_PORT;
const app = express();

app.get('/', (req, res) => {
  console.log('Get to root, ', req);
  return new User()
  .fetchAll({withRelated: ['contacts']})
  .then((data) => {
    return res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.listen(port, () => {
  console.log('Server listening on ', port);
});