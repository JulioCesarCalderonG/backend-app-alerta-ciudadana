const { Router } = require("express");
const { validarDNISunat } = require("../controllers/validar-sunat");




const router = Router();



router.post('/',validarDNISunat);





module.exports = router;