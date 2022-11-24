const { Router } = require("express");
const { getAlertas, getAlerta, postAlerta, putAlerta, deleteAlerta } = require("../controllers/alertas");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

router.get('',getAlertas);
router.get('/:id',getAlerta);
router.post('',[
    validarJWT,
    validarCampos
],postAlerta);
router.put('/:id',putAlerta);
router.delete('/:id',deleteAlerta);


module.exports = router;