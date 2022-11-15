const { Router } = require("express");
const { check } = require("express-validator");
const { getTipoAlertas, getTipoAlerta, postTipoAlerta, putTipoAlerta, deleteTipoAlerta } = require("../controllers/tipo-alertas");
const { nombreTipoAlerta } = require("../helpers");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('/',getTipoAlertas);
router.get('/:id',getTipoAlerta);
router.post('/',[
    check('nombre').custom(nombreTipoAlerta),
    validarCampos
],postTipoAlerta);
router.put('/:id',putTipoAlerta);
router.delete('/:id',deleteTipoAlerta);


module.exports = router

