const { Router } = require("express");
const { authUsuario, logoutUsuario, validarTokenUsuario } = require("../controllers/auth-usuario");
const { validarCampos, validarJWTUsuario } = require("../middlewares");


const router = Router();

router.get('',[
    validarJWTUsuario,
    validarCampos
],validarTokenUsuario);
router.post('',authUsuario);
router.put('',[
    validarJWTUsuario,
    validarCampos
],logoutUsuario);



module.exports = router;