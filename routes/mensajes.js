const { Router } = require("express");
const { enviarMensaje } = require("../controllers/mensajes");



const router = Router();



router.post('/',enviarMensaje);


module.exports = router