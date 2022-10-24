const { Router } = require("express");
const { getDetalleCiudadanos, getDetalleCiudadano, postDetalleCiudadano, putDetalleCiudadano } = require("../controllers/detalle-ciudadano");
const { validarCampos, validarJWT } = require("../middlewares");





const router = Router();


router.get('/',getDetalleCiudadanos);
router.get('/mostrardetalle',[
    validarJWT,
    validarCampos
],getDetalleCiudadano)
router.post('/',[
    validarJWT,
    validarCampos
],postDetalleCiudadano);
router.put('/actualizardetalle',[
    validarJWT,
    validarCampos
],putDetalleCiudadano);

module.exports = router;