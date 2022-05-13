const express = require('express');
const router = express.Router();

const model = require('../../models/user');

router.post('/new/user', (req, res) => {
    let body = req.body;

    let userInsert = new model({
        nombre: body.nombre,
        apellido1: body.apellido1,
        apellido2: body.apellido2,
        edad: body.edad,
        direccion: body.direccion,
        telefono: body.telefono
    });

    userInsert.save();

    res.json({
        ok: true,
        msg: 'Usuario registrado',
        data: userInsert
    });
});

router.get('/users', async (req, res) => {
    const usuarios = await model.find();

    res.json({
        ok: true,
        data: usuarios
    });
});

router.get('/users/:nombre', async (req, res) => {
    const matches = await model.find();

    res.json({
        ok: true,
        params: req.params.nombre,
        data: matches
    });
});

module.exports = router;

