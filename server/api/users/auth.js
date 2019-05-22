'use strict';

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) =>{
  res.send('Login OK');
});

module.exports = router;
