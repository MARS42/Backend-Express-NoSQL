const express = require('express');
const app = express();

app.use(require('./user/user-route'));

module.exports = app;