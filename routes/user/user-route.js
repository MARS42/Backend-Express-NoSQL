const express = require('express');
const { Router } = express;

const model = require('../../models/user');

const app = express();

app.post('/new/user', (req, res) => {
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

app.get('/usuarios', async (req, res) => {
    const usuarios = await model.find();

    res.json({
        ok: true,
        data: usuarios
    });
});