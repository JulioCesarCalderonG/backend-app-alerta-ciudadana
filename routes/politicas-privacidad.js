const { Router, request, response } = require("express");
const { politicaPrivacidad } = require("../controllers/politica-privacidad");



const router = Router();


router.get('',politicaPrivacidad);


module.exports = router;