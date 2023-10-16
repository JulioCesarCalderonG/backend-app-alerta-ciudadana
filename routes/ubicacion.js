const { Router, request, response } = require("express");
const Mapa = require("../classes/mapa");
//const { mapa } = require("../sockets/sockets");


const router = Router();
const mapa = new Mapa();

router.get('/mapa', (req=request, res=response)=>{


    res.json(mapa.getMarcadores())
})


module.exports = router;