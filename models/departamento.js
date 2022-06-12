const { Schema, model } = require('mongoose');

const departamentoSchema = Schema({
    nombre: { type: String },
    semestre: { type: Number },
    edificio: { type: String },
    piso: { type: Number },
    usuario: { type: Schema.Types.ObjectId, ref: 'Alumnos' },
    universidad: { type: Schema.Types.ObjectId, ref: 'Unis' },
});

module.exports = model('Departamentos', departamentoSchema);

