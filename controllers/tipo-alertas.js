const { response, request } = require("express");
const {TipoAlerta} = require("../models");



const getTipoAlertas = async(req=request, res=response) =>{
    const {estado} =req.query;
    const tipoalerta = await TipoAlerta.findAll({
        where:{
            estado
        }
    });
    try {
        res.json({
            ok:true,
            msg:'Se muestran todas las alertas',
            tipoalerta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const getTipoAlerta = async(req=request, res=response) =>{
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
const postTipoAlerta = async(req=request, res=response) =>{
    try {
        const {nombre, ...data} =req.body;
        data.nombre = nombre.toUpperCase();
        const tipoalerta = await TipoAlerta.create(data);
        res.json({
            ok:true,
            msg:'Tipo de alerta creada con exito',
            tipoalerta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const putTipoAlerta = async(req=request, res=response) =>{
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
const deleteTipoAlerta = async(req=request, res=response) =>{
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
    getTipoAlertas,
    getTipoAlerta,
    postTipoAlerta,
    putTipoAlerta,
    deleteTipoAlerta
}