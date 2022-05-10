require('dotenv').config();
const cors = require('cors');
const dbConfig = require('./db/config');
const express = require('express');
const app = express();

const start = async () =>{
    
    app.use(express.json());

    app.use(cors());

    await dbConfig.conn();

    app.get('/', (req, res) => {
        res.json({
            ok: true,
            message: 'Bienvendio backend NoSQL'
        }); 
    });

    app.use(require('./routes/main-route'));

    app.listen(process.env.PORT, () => {

        console.log("Running backend...");

    });
}

start();