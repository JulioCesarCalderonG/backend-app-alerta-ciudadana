const { Router } = require("express");
const { authUsuario } = require("../controllers/auth-usuario");


const router = Router();


router.post('',authUsuario)




module.exports = router;