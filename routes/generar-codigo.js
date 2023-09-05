const { Router } = require("express");
const {postGenerarCodigo, eliminarCuenta} = require("../controllers/generar-codigo");


const router = Router();


router.post('',postGenerarCodigo);
router.delete('/:id',eliminarCuenta)

module.exports = router;
