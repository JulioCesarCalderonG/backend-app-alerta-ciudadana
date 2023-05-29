const { Router } = require("express");
const { validarDNISunat, ValidarGetSunat, validarDNISunatUsuario } = require("../controllers/validar-sunat");




const router = Router();



router.post('/',validarDNISunat);
router.post('/usuario',validarDNISunatUsuario);
router.get('/:dni',ValidarGetSunat);





module.exports = router;