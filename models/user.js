const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nombre: { type: String },
    apellido1: { type: String },
    apellido2: { type: String },
    edad: { type: Number },
    direccion: { type: Array },
    telefono : { type: String }
});

module.exports = model('Users', userSchema);

