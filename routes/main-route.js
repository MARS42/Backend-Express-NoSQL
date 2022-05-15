const express = require('express');
const app = express();

app.use(require('./user/user-route'));
app.use(require('./practica/practica-route'))

module.exports = app;