const { Router } = require("express");
const { mostrarVehiculos, mostrarVehiculoID, postVehiculo, putVehiculo, deleteVehiculo } = require("../controllers/vehiculos");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { nombreVehiculo } = require("../helpers");



const router = Router();


router.get('',mostrarVehiculos);
router.get('/:id',mostrarVehiculoID);
router.post('',[
    check('nombre').custom(nombreVehiculo),
    validarCampos
],postVehiculo);
router.put('/:id',putVehiculo);
router.delete('/:id',deleteVehiculo);

module.exports =router;