const { Router } = require("express");
const { reporteFiltroAlertaGenerada, mostrarReporte, reporteCiudadano, reporteAlertaDerivada, reporteControlSistema, mostrarCiudadanoReporte, mostrarControlReporte, mostrarAlertaDerivadaReporte } = require("../controllers/reportes");



const router = Router();


router.post('/alertageneral',reporteFiltroAlertaGenerada);

router.get('/alertageneral',mostrarReporte);

router.post('/ciudadano',reporteCiudadano);
router.post('/alertaderivada',reporteAlertaDerivada);
router.post('/controlsistema',reporteControlSistema);


router.get('/ciudadano/:nombre',mostrarCiudadanoReporte);
router.get('/control/:nombre',mostrarControlReporte);
router.get('/alertaderivada/:nombre',mostrarAlertaDerivadaReporte);
module.exports = router