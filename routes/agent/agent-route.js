const encrypt = require("bcryptjs");
const jwtFactory = require('../../security/jwt');
const model = require("../../models/agent/agent");
const express = require("express");
const app = express();

app.get('/agent/list', async (req, res) => {
    const agents = (await model.find()).map(agent => `${agent._id}/${agent.email}/${agent.name}`);
    
    res.json({
        ok: true,
        msg: 'List of agents',
        data: agents
    });
});

app.post('/agent/register', async (req, res) => {
    const body = req.body;
    const email = body.email;

    const exists = await model.findOne({ email: email });

    if(exists !== null){
        res.status(409).json({
            ok: false,
            msg: `Agent ${email} already exists!`
        });
        return;
    }

    const salt = encrypt.genSaltSync();

    const insert = new model({
        name: body.name,
        role: body.role,
        phone: body.phone,
        email: email,
        password: encrypt.hashSync(body.password, salt)
    });

    insert.save();

    res.json({
        ok: true,
        msg: 'New agent registered!',
        data: insert
    });
});

app.post('/agent/login', async (req, res = this.response) => {
    const email = req.body.email;
    const password = req.body.password;

    const agent = await model.findOne({ email: email });

    if(agent === null){
        res.status(404).json({
            ok: false,
            msg: 'Email not found'
        });
        return;
    }

    const checkPass = encrypt.compareSync(password, agent.password);

    if(!checkPass){
        res.status(404).json({
            ok: false,
            msg: 'Error on email or password!'
        });
        return;
    }

    const token = await jwtFactory(agent.id);

    res.json({
        ok: true,
        msg: `Logged successfully, Welcome again ${agent.name}`,
        data: agent,
        token: token
    });
});

app.post('/agent/fulllogin', async (req, res = this.response) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const agent = await model.findOne({ name: name, email: email });

    if(agent === null){
        res.status(404).json({
            ok: false,
            msg: 'Email and name not found'
        });
        return;
    }

    const checkPass = encrypt.compareSync(password, agent.password);

    if(!checkPass){
        res.status(404).json({
            ok: false,
            msg: 'Error on email or password!'
        });
        return;
    }

    res.json({
        ok: true,
        msg: `Logged successfully, Welcome again ${agent.name}`,
        data: agent
    });
});

app.delete('/agent/remove/:id', async (req, res) => {
    const removed = await model.findByIdAndRemove(req.params.id);

    res.json({
        ok: true,
        msg: 'Agent removed',
        data: removed
    });
});

module.exports = app;
