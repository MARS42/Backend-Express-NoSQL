const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const conn = async() => {
    try{
        await mongoose.connect(process.env.CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo!");

    } catch(error){
        //throw new Error ("Error al conectar a la BD");
        console.log("Error al conectar a la BD ", error);
    }
};

module.exports = { conn };