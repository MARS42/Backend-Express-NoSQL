const express = require('express');
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

module.exports = router;

