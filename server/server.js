const express = require('express');
const app = express();

const port = process.env.EXPRESS_CONTAINER_PORT;

app.get('/', (req, res) => {
  console.log('get to root, ', req);
  res.send('OK');
})

app.listen(port, () => {
  console.log('Server listening on ', port);
})