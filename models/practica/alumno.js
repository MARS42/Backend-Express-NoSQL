const { Schema, model } = require('mongoose');

const alumnoSchema = Schema({
    nombre: { type: String },
    materia: { type: String },
    calificaciones: { type: Array },
    matricula: { type: String }
});

module.exports = model('NoSQL', alumnoSchema);

