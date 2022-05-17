const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

const model = require('../../models/practica/alumno');

router.post('/practica/nuevo', async (req, res) => {
    let body = req.body;

    let alumnoInsert = new model({
        nombre: body.nombre,
        materia: body.materia,
        calificaciones: body.calificaciones,
        matricula: body.matricula
    });

    alumnoInsert.save();

    res.json({
        ok: true,
        msg: 'Alumno registrado',
        data: alumnoInsert
    });
});

router.get('/practica/alumnos', async (req, res) => {
    const registros = await model.find();

    res.json(
        {
            ok: true,
            msg: "Alumnos obtenidos",
            data: registros
        }
    );
});

router.get('/practica/alumnos/:id', async (req, res) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)) {
        res.json({
            ok: false,
            msg: 'Id de objeto no válida'
        });
        return;
    }

    const result = await model.findById(id);

    res.json({
        ok: true,
        data: result
    });
});

module.exports = router;

