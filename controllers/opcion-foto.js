const { request, response } = require("express");
const { OpcionFoto } = require("../models");




const getOpcionFotos = async(req=request, res=response)=>{
    try {
        const opcionFoto = await OpcionFoto.findAll();
        res.json({
            ok:true,
            msg:`Se muestra la opcion de foto con exito`,
            opcionFoto
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}


module.exports = {
    getOpcionFotos
}