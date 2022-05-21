const express = require('express');
const app = express();

app.use(require('./user/user-route'));
app.use(require('./practica/practica-route'));
app.use(require('./practica/ferreteria-route'));

module.exports = app;