const { request, response } = require("express");
const { subirArchivo } = require("../helpers");


const getAlertas = async(req=request,res=response)=>{
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

const postAlerta = async(req=request,res=response)=>{
    try {
        const {lat,lng,...data} = req.body;
        
        if (req.files) {
            const file = req.files;
            const foto = await subirArchivo(file,undefined,'alertas');
            data.foto = foto;
            return res.json({
                foto,
                data
            })
        }


        data.lat = Number(lat);
        data.lng = Number(lng);
        const ciudadano = req.ciudadanoToken;
        res.json({
            ok:true,
            data,
            ciudadano
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
    postAlerta,
    putAlerta,
    deleteAlerta
}