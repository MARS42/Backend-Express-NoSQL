const model = require("../../models/departamento");
const express = require("express");
const app = express();

app.get('/departamento/:id?', async (req, res) => {
    const id = req.params.id;

    if(id === null){
        const todos = await model.find();
        res.json({
            ok: true,
            data: todos
        });

        return;
    }

    const datos = await model.findById(id).populate('usuario').populate('universidad');

    res.json({
        ok: true,
        data: datos
    })
});

app.get('/departamentos/', async (req, res) => {
    const todos = await model.find().populate('usuario').populate('universidad');
    res.json({
        ok: true,
        data: todos
    });
});

app.post('/departamento/nuevo', async (req, res) => {
    const body = req.body;
    const nombre = body.nombre;

    const exists = await model.findOne({ nombre: nombre });

    if(exists !== null){
        res.json({
            ok: false,
            msg: `Ya existe un departamento con el nombre ${nombre}`
        });
        return;
    }

    const insert = new model({
        nombre: nombre,
        semestre: body.semestre,
        edificio: body.edificio,
        piso: body.piso,
        usuario: body.usuario,
        universidad: body.universidad
    });

    insert.save();

    res.json({
        ok: true,
        msg: 'Departamento agregado!',
        data: insert
    });
});

module.exports = app;