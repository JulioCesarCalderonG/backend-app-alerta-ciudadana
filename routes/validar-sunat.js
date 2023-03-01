const { Router } = require("express");
const { validarDNISunat, ValidarGetSunat } = require("../controllers/validar-sunat");




const router = Router();



router.post('/',validarDNISunat);
router.get('/:dni',ValidarGetSunat);





module.exports = router;