const JWT = require('jsonwebtoken');

const jwtFactory = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        JWT.sign(payload, process.env.SIGNA, { expiresIn: '12h' }, (error, token) => {
            if(error)
                reject('Error on token generation');
            else
                resolve(token);
        });
    });
};

module.exports = jwtFactory;