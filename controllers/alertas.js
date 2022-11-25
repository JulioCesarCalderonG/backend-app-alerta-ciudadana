const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const {funDate} = require("../helpers");
const { Alerta, Ciudadano, TipoAlerta } = require("../models");


const getAlertas = async(req=request,res=response)=>{
    try {
        const alerta = await Alerta.findAll({   
            include:[
                {
                    model:Ciudadano
                },
                {
                    model:TipoAlerta
                }
            ]
        });
        res.json({
            ok:true,
            msg:`Se muestra todos las alertas cudadanas`,
            alerta
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const getAlerta = async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const getAlertaCiudadano = async(req=request,res=response)=>{
    try {
        const {id, nombre, apellido} = req.ciudadanoToken;
        const alerta = await Alerta.findAll({
            where:{
                ciudadano:id
            }
        })
        res.json({
            ok:true,
            resp:`Se muestra las alertas del ciudadano: ${nombre} ${apellido}`,
            alerta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const postAlerta = async(req=request,res=response)=>{
    try {
        const {lat,lng,...data} = req.body;
        const {hora, fecha}= funDate();
        const ciudadano = req.ciudadanoToken;
        if (req.files) {
            const file = req.files;
            const foto = await subirArchivo(file,undefined,'alertas');
            data.foto = foto;
        }
        data.lat = Number(lat);
        data.lng = Number(lng);
        data.fecha = fecha;
        data.hora = hora;
        data.ciudadano = ciudadano.id;
        const alerta = await Alerta.create(data);
        res.json({
            ok:true,
            msg:`Se envio la alerta ciudadana, la patrulla esta en camino`,
            alerta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const putAlerta = async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const deleteAlerta = async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}



module.exports = {
    getAlertas,
    getAlerta,
    getAlertaCiudadano,
    postAlerta,
    putAlerta,
    deleteAlerta
}