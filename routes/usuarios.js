const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require("../controllers/usuarios");
const { validarDNIUsuario } = require("../helpers");
const { validarCampos } = require("../middlewares");



const router = Router();


router.get('',getUsuarios);
router.get('/:id',getUsuario);
router.post('',[
    check('dni').custom(validarDNIUsuario),
    validarCampos
],postUsuario);
router.put('/:id',putUsuario);
router.delete('/:id',deleteUsuario);





module.exports =router;