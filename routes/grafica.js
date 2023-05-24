const { Router } = require("express");
const { graficaAlerta, graficaAlertaGenerada, alertaTotal, alertaTotalGeneral } = require("../controllers/grafica");


const router = Router();

router.get('/alerta',graficaAlerta);
router.get('/alertagenerada',graficaAlertaGenerada);
router.get('/alerta/total',alertaTotal);
router.get('/alertagenerada/total',alertaTotalGeneral);
module.exports = router;