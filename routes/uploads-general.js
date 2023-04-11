const { Router } = require("express");
const { putUploadTipoAtencion, mostrarTipoAtencion, mostrarTipoAlerta, putUploadTipoAlerta, mostrarImageCiudadano, putUploadCiudadano } = require("../controllers/uploads-general");
const { validarCampos, validarArchivoSubir, validarJWT, validarJWTParams } = require("../middlewares");



const router = Router();

/* Actualizar Tipo Atencion */
router.get('/tipo-atencion/:imagen/:id',mostrarTipoAtencion);
router.put('/tipo-atencion/:id',[
    validarArchivoSubir,
    validarCampos
],putUploadTipoAtencion);
/* Actualizar Tipo Alerta */
router.get('/tipo-alerta/:nombre/:id',mostrarTipoAlerta);
router.put('/tipo-alerta/:id',[
    validarArchivoSubir,
    validarCampos
],putUploadTipoAlerta);
/* Actualizar Detalle Ciudadano */
router.get('/ciudadano/:imagen',[
    validarJWTParams,
    validarCampos
],mostrarImageCiudadano);
router.put('/ciudadano',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],putUploadCiudadano);


module.exports = router