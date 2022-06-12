const { Schema, model } = require('mongoose');

const modeloUni = Schema({
    nombre: { type: String },
    director: { type: String },
});

module.exports = model('Unis', modeloUni);