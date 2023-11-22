const { Router, request, response } = require("express");
const {mapa} = require("../sockets/mapa-socket");


const router = Router();


router.get('/mapa', (req=request, res=response)=>{


    res.json(mapa.getMarcadores())
})


module.exports = router;