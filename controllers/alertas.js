const { request, response } = require("express");


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
        const data = req.body;
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