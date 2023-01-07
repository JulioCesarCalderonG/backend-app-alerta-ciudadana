const { Router } = require("express");
const { putUploadTipoAtencion, mostrarTipoAtencion, mostrarTipoAlerta, putUploadTipoAlerta, mostrarImageCiudadano } = require("../controllers/uploads-general");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router = Router();


router.get('/tipo-atencion/:id',mostrarTipoAtencion);
router.put('/tipo-atencion/:id',[
    validarArchivoSubir,
    validarCampos
],putUploadTipoAtencion);
router.get('/tipo-alerta/:nombre/:id',mostrarTipoAlerta);
router.get('/ciudadano/:id',mostrarImageCiudadano);
router.put('/tipo-alerta/:id',[
    validarArchivoSubir,
    validarCampos
],putUploadTipoAlerta);



module.exports = router