
const { Router } = require("express");
const { check } = require('express-validator');
const { validarArchivoSubir, validarCampos } = require("../middlewares");
const { coleccionesPermitidas } = require('../helpers');
const { cargarArchivos, actualizarImagenCloudinary, mostrarImagen } = require("../controllers/uploads");



const router= Router();

router.post('/', validarArchivoSubir, cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','pruebax'])),
    validarCampos
],actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','pruebax'])),
    validarCampos], mostrarImagen)


module.exports = router;
