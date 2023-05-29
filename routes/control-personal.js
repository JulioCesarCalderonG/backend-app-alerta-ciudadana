const { Router } = require("express");
const { mostrarControlPersonal } = require("../controllers/control-personal");




const router = Router();



router.get('',mostrarControlPersonal);


module.exports = router;
