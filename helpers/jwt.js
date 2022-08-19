const jwt = require('jsonwebtoken');

function generaJWT(uid) {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');

            }
            else {
                resolve(token);
            }
        }
        )
    });
}

const comprobarJWT = (token = '') => {

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        return [true, uid];
    } catch (error) {
        return [false, null]
    }
}

module.exports = { generaJWT, comprobarJWT }