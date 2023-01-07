const { Router } = require("express");
const { check } = require("express-validator");
const { getTipoAlertas, getTipoAlerta, postTipoAlerta, putTipoAlerta, deleteTipoAlerta, mostrarImagenTipoAlerta } = require("../controllers/tipo-alertas");
const { nombreTipoAlerta } = require("../helpers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();

router.get('/',getTipoAlertas);
router.get('/:id',getTipoAlerta);
router.get('/mostrar/imagen/:ciudadano/:id',mostrarImagenTipoAlerta)
router.post('/',[
    check('nombre').custom(nombreTipoAlerta),
    validarArchivoSubir,
    validarCampos
],postTipoAlerta);
router.put('/:id',putTipoAlerta);
router.delete('/:id',deleteTipoAlerta);


module.exports = router

