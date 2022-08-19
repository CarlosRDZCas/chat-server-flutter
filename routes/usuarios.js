/*
path: api/usuarios
*/


const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-token');
const { getUsuarios } = require('../controllers/usuario');

const router = Router();


router.get('/',validarJWT, getUsuarios);



module.exports = router;