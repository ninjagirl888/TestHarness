const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync(CERT_PATH),
  cert: fs.readFileSync(KEY_PATH),
};

app.use((req, res, next) => {
  res.send('<h1>HTTPS is working!</h1>');
});

const port = 3000;

https.createServer(options, app).listen(port, () => {
  console.log('Server listening on port ' + port);
});