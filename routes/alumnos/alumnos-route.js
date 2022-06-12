const encrypt = require("bcryptjs");
const jwtFactory = require('../../security/jwt');
const isValidId = require("../../utils/idValidator");
const model = require("../../models/alumno");
const modelDepartamento = require("../../models/departamento");
const express = require("express");
const app = express();

app.post('/alumno/nuevo', async (req, res) => {
    const body = req.body;
    const matricula = body.matricula;
    const materia = body.materia;
    const departamento = body.carrera;

    const exists = await model.findOne({ matricula: matricula, materia: materia });

    if(exists !== null){
        res.status(409).json({
            ok: false,
            msg: `El alumno con matricula ${matricula} ya tiene la materia ${materia}!`
        });
        return;
    }

    if(!isValidId(departamento)){
        res.json({
            ok: false,
            msg: `El id de departamento ${departamento} no es válido`
        });
        return;
    }

    const existsDepartamento = await modelDepartamento.findById(departamento);

    if(existsDepartamento === null){
        res.status(404).json({
            ok: false,
            msg: `No existe un departamento con el id ${departamento}`
        });
        return;
    }

    const insert = new model({
        nombre: body.nombre,
        materia: materia,
        calificacion: body.calificacion,
        matricula: matricula,
        carrera: departamento,
    });

    insert.save();

    res.json({
        ok: true,
        msg: 'Alumno con materia agregado!',
        data: insert
    });
});

app.get('/alumno/:id', async (req, res) => {
    const id = req.params.id;

    if(!isValidId(id)) {
        res.json({
            ok: false,
            msg: 'Id de objeto no válida'
        });
        return;
    }

    const alumno = await model.findById(id);

    if(alumno === null){
        res.status(404).json({
            ok: false,
            msg: `Alumno con id ${id} no encontrado`
        });
        return;
    }

    res.json({
        ok: true,
        msg: 'Alumno obtenido',
        data: alumno
    });
});

app.get('/alumnos', async (req, res) => {
    const datos = await model.find();

    const union = await Promise.all(
        datos.map(async (alumno) => {

            const depto = await modelDepartamento.findById(alumno["carrera"]);
            return { alumno: alumno, departamento: depto };
        })
    );

    res.json({
        ok: true,
        data: union
    });
});

module.exports = app;
