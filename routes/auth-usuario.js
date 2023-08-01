const { Router } = require("express");
const { authUsuario, logoutUsuario, validarTokenUsuario, authUsuarioSerenazgo, logoutUsuarioSerenazgo } = require("../controllers/auth-usuario");
const { validarCampos, validarJWTUsuario, validarJWTUsuarioParams } = require("../middlewares");


const router = Router();

router.get('',[
    validarJWTUsuarioParams,
    validarCampos
],validarTokenUsuario);
router.post('',authUsuario);
router.post('/serenazgo',authUsuarioSerenazgo);
router.put('',[
    validarJWTUsuario,
    validarCampos
],logoutUsuario);
router.put('/serenazgo',[
    validarJWTUsuarioParams,
    validarCampos
],logoutUsuarioSerenazgo);



module.exports = router;