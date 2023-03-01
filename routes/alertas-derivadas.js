const { Router } = require("express");
const { getAlertaDerivadas, getAlertaDerivada, postAlertaDerivada, putAlertaDerivada, deleteAlertaDerivada } = require("../controllers/alertas-derivadas");
const { validarCampos, validarJWT, validarJWTUsuario } = require("../middlewares");
const { check } = require("express-validator");
const { alertaDerivada } = require("../helpers");




const router = Router();


router.get("/", getAlertaDerivadas);
router.get("/:id", getAlertaDerivada);
router.post("/",[
    check('id_alerta').custom(alertaDerivada),
    validarCampos
], postAlertaDerivada);
router.put("/:id", putAlertaDerivada);
router.delete("/:id", deleteAlertaDerivada);
module.exports = router;