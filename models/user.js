const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nombre: { type: String },
    apellido1: { type: String },
    apellido2: { type: String },
    edad: { type: Integer },
    direccion: { type: Array }
});

module.exports = model('Users', userSchema);
