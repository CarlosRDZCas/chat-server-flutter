/*
path: api/login
*/

const { crearUsuario, login, renewToken } = require('../controllers/auth')
const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos, } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-token');

const router = Router();


router.post('/new', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('email', 'El correo es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos,
], crearUsuario);

router.post('/', [
    check('email', 'El correo es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
],
    validarCampos,
    login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;