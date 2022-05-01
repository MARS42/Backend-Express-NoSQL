const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const conn = async() => {
    try{
        await mongoose.connect('mongodb+srv://broot:3549355Atlas.@3r6abd.wqjg4.mongodb.net/Backend?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Atlas!");

    } catch(error){
        //throw new Error ("Error al conectar a la BD");
        console.log("Error al conectar a la BD ", error);
    }
};

module.exports = { conn };