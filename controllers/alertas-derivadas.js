const { request, response } = require("express");
const { AlertaDerivada } = require("../models");



const getAlertaDerivadas=async (req = request, res = response) =>{
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito'
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}
const getAlertaDerivada=async (req = request, res = response) =>{
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito'
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}
const postAlertaDerivada=async (req = request, res = response) =>{
    try {
        const data = req.body;
        const alertaDerivada = await AlertaDerivada.create(data);
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            data
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}
const putAlertaDerivada=async (req = request, res = response) =>{
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito'
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}
const deleteAlertaDerivada=async (req = request, res = response) =>{
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito'
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}



module.exports = {
    getAlertaDerivadas,
    getAlertaDerivada,
    postAlertaDerivada,
    putAlertaDerivada,
    deleteAlertaDerivada
}