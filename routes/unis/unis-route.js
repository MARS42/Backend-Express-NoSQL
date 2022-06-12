const model = require("../../models/universidad");
const express = require("express");
const app = express();

app.get('/unis', async (req, res) => {
    const todos = await model.find();
    res.json({
        ok: true,
        data: todos
    });
});

app.post('/unis/nuevo', async (req, res) => {
    const body = req.body;
    const { nombre, director } = body;

    const insert = new model({
        nombre: nombre,
        director: director,
    });

    insert.save();

    res.json({
        ok: true,
        msg: 'Universidad agregada!',
        data: insert
    });
});

module.exports = app;