const { Router } = require("express");
const { check } = require("express-validator");
const { getCiudadanos, getCiudadano, postCiudadano, deleteCiudadano, updateCiudadano, actualizarPassword } = require("../controllers/ciudadanos");
const { validarDNICiudadano } = require("../helpers");
const { validarCampos } = require("../middlewares");



const router = Router();



router.get('/',getCiudadanos);
router.get('/:id',getCiudadano);
router.post('/',[
    validarCampos
],postCiudadano);
router.put('/',updateCiudadano);
router.delete('/',deleteCiudadano);
router.post('/:token',actualizarPassword);



module.exports = router;