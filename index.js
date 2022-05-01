const dbConfig = require('./db/config');
const express = require('express');
const app = express();

const start = async () =>{
    app.use(express.json());

    await dbConfig.conn();

    app.get('/', (req, res) => {
        res.json({
            ok: true,
            message: 'Bienvendio backend NoSQL'
        }); 
    });

    app.listen(3000, () => {

        console.log("Running backend...");

    });
}

start();