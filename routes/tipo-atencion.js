const { Router } = require("express");
const { check } = require("express-validator");
const { getTipoAtenciones, getTipoAtencion, postTipoAtencion, putTipoAtencion, deleteTipoAtencion } = require("../controllers/tipo-atencion");
const { nombreTipoAtencion } = require("../helpers");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");



const router = Router();


router.get('',getTipoAtenciones);
router.get('/:id',getTipoAtencion);
router.post('',[
    check('nombre').custom(nombreTipoAtencion),
    validarArchivoSubir,
    validarCampos
],postTipoAtencion);
router.put('/:id',putTipoAtencion);
router.delete('/:id',deleteTipoAtencion);





module.exports =router;