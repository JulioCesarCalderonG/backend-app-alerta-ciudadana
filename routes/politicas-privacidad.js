const { Router, request, response } = require("express");
const { politicaPrivacidad, poderJudicial } = require("../controllers/politica-privacidad");



const router = Router();


router.get('',politicaPrivacidad);
router.get('/poderjudicial',poderJudicial);

module.exports = router;