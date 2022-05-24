const encrypt = require("bcryptjs");
const model = require("../../models/agent/agent");
const express = require("express");
const app = express();

app.get('/agent/list', async (req, res) => {
    const agents = (await model.find()).map(agent => `${agent._id}/${agent.email}`);
    
    res.json({
        ok: true,
        msg: 'List of agents',
        data: agents
    });
});

app.post('/agent/register', (req, res) => {
    const body = req.body;

    const salt = encrypt.genSaltSync();

    const insert = new model({
        name: body.name,
        role: body.role,
        phone: body.phone,
        email: body.email,
        password: encrypt.hashSync(body.password, salt)
    });

    insert.save();

    res.json({
        ok: true,
        msg: 'New agent registered!',
        data: insert
    });
});

app.post('/agent/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const agent = await model.findOne({ email: email });

    if(agent === null){
        res.json({
            ok: false,
            msg: 'Agent not found'
        });
        return;
    }

    const truePassword = encrypt.compareSync(password, agent.password);

    if(!truePassword){
        res.json({
            ok: false,
            msg: 'Email or password is wrong!'
        });
        return;
    }

    res.json({
        ok: true,
        msg: 'Logged successfully',
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
