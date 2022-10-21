const { Router, request, response } = require("express");
const { postLogin, validarTokenCiudadano } = require("../controllers/auth");
const {validarCampos, validarJWT} = require('../middlewares')
const router = Router();


router.get('/',[
    validarJWT,
    validarCampos
],validarTokenCiudadano);

router.post('/:coleccion',[
    validarCampos
], postLogin);




module.exports = router;