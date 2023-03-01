const { Router } = require("express");
const { authUsuario, logoutUsuario } = require("../controllers/auth-usuario");
const { validarCampos, validarJWTUsuario } = require("../middlewares");


const router = Router();


router.post('',authUsuario);
router.put('',[
    validarJWTUsuario,
    validarCampos
],logoutUsuario);



module.exports = router;