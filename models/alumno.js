const { Schema, model } = require('mongoose');

const alumnoSchema = Schema({
    nombre: { type: String },
    materia: { type: String },
    calificacion: { type: Number },
    matricula: { type: String},
    carrera: { type: String },
});

module.exports = model('Alumnos', alumnoSchema);

