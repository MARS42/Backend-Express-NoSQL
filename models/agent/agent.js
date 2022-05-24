const { Schema, model } = require('mongoose');

const agentModel = new Schema({
    name: { type: String },
    role: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String }
});

module.exports = model('Agents', agentModel);