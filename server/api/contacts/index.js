'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('smoke test');
})

module.exports = router;