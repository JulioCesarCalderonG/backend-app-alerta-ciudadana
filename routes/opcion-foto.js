const { Router } = require("express");
const { getOpcionFotos } = require("../controllers/opcion-foto");



const router = Router();



router.get('/', getOpcionFotos);



module.exports = router;