const { Router } = require("express");
const { getAlertasGeneradas, getAlertasGenerada, postAlertasGenerada, putAlertasGenerada, deleteAlertasGenerada, filtroAlertaGenerada } = require("../controllers/alertas-generadas");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { alertaGenerada } = require("../helpers");


const router = Router();


router.get('',getAlertasGeneradas);
router.post('/filtro/alerta',filtroAlertaGenerada);
router.put('/:id',getAlertasGenerada);
router.post('',[
    check("id_alerta").custom(alertaGenerada),
    validarCampos
],postAlertasGenerada);
router.put('/:id',putAlertasGenerada);
router.delete('/:id',deleteAlertasGenerada);


module.exports = router;