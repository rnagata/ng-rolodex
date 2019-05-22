'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userIndex = require('./api/users/index');
const userAuth = require('./api/users/auth');
const contacts = require('./api/contacts/index');

const port = process.env.EXPRESS_CONTAINER_PORT;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/contacts', contacts);
app.use('/api', userIndex);
app.use('/api', userAuth);

app.listen(port, () => {
  console.log('Server listening on ', port);
});