const { Router } = require("express");
const { getCentroAtenciones, getCentroAtencion, postCentroAtencion, putCentroAtencion, deleteCentroAtencion } = require("../controllers/centro-atencion");
const { validarCampos, validarJWTUsuario } = require("../middlewares");



const router = Router();


router.get('',getCentroAtenciones);
router.get('/:id',getCentroAtencion);
router.post('',[
    validarJWTUsuario,
    validarCampos
],postCentroAtencion);
router.put('/:id',putCentroAtencion);
router.delete('/:id',deleteCentroAtencion);





module.exports =router;