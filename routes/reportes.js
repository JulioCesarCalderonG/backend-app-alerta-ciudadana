const { Router } = require("express");
const { reporteFiltroAlertaGenerada, mostrarReporte } = require("../controllers/reportes");



const router = Router();


router.post('/alertageneral',reporteFiltroAlertaGenerada);

router.get('/alertageneral',mostrarReporte);
module.exports = router