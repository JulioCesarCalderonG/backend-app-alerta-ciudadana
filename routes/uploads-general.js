const { Router } = require("express");
const { putUploadTipoAtencion, mostrarTipoAtencion } = require("../controllers/uploads-general");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router = Router();


router.get('/tipo-atencion/:id',mostrarTipoAtencion)
router.put('/tipo-atencion/:id',[
    validarArchivoSubir,
    validarCampos
],putUploadTipoAtencion);



module.exports = router