const { Router, request, response } = require("express");
const { getAlertas, getAlerta, postAlerta, putAlerta, deleteAlerta, getAlertaCiudadano, filtroAlerta, getFiltroAlertas } = require("../controllers/alertas");
const { validarCampos, validarJWT } = require("../middlewares");
const { funDate, funDateDos } = require("../helpers");

const router = Router();

router.get('',getAlertas);
router.get('/mostrar/filtro/alerta',getFiltroAlertas);
router.get('/mostrar/ciudadano',[
    validarJWT,
    validarCampos
],getAlertaCiudadano);
router.get('/:id',getAlerta);
router.post('/filtro/alerta',filtroAlerta);
router.post('',[
    validarJWT,
    validarCampos
],postAlerta);
router.put('/:id',putAlerta);
router.delete('/:id',deleteAlerta);


router.get('/mostrar/zonahoraria',(req=request,res=response)=>{
    const {fecha,hora,date} = funDate();
    const {fechaAnterior,newDateObj}= funDateDos();
    res.json({
        ok:true,
        fecha,
        hora,
        newDateObj,
        date
    })
})


module.exports = router;