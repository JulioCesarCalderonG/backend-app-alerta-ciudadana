const { request, response } = require("express");
const { enviarWelcome } = require("../helpers");

const enviarMensaje=async(req=request, res=response)=>{
    const {correo} = req.body;
    const resp = await enviarWelcome(correo);
    res.json({
        ok:true,
        correo
    })
}




module.exports = {
    enviarMensaje
}