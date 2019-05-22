'use strict';

const express = require('express');


const router = express.Router();

router.route('/login')
.post((req, res) => {
  console.log('/login post request');
  res.send('Login OK');
});

router.route('/logout')
.post((req, res) => {
  console.log('/logout post request');
  res.send('Logout OK');
})

module.exports = router;
