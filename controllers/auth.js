const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generaJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Ususario Creado',
            usuario,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'

        })
    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuariodb = await Usuario.findOne({ email: email });
        if (!usuariodb) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        const validaPassword = bcrypt.compareSync(password, usuariodb.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });
        }
        const token = await generaJWT(usuariodb.id);

        res.json({
            ok: true,
            msg: 'login',
            usuariodb,
            token

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generaJWT(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        msg: 'renew',
        usuario,
        token

    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}