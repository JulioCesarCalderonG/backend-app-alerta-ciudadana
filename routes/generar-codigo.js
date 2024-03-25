const { Router } = require("express");
const {postGenerarCodigo, eliminarCuenta, postGenerarCodigoToken} = require("../controllers/generar-codigo");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();


router.post('',postGenerarCodigo);
router.post('/codigo',[
    validarJWT,
    validarCampos
],postGenerarCodigoToken);
router.delete('/:id',eliminarCuenta);

module.exports = router;
