'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const Contact = require('./database/models/Contact');
// const User = require('./database/models/User');
const userIndex = require('./api/users/index');
const userAuth = require('./api/users/auth');

const port = process.env.EXPRESS_CONTAINER_PORT;


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', userIndex);
app.use('/api', userAuth);

app.listen(port, () => {
  console.log('Server listening on ', port);
});