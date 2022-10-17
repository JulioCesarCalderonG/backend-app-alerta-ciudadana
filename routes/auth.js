const { Router, request, response } = require("express");
const { postLogin } = require("../controllers/auth");
const {validarCampos} = require('../middlewares')
const router = Router();

router.post('/:coleccion',[
    validarCampos
], postLogin);


module.exports = router;