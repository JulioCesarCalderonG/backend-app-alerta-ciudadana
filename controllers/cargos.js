const { response, request } = require("express");
const {siglaFun, mayusPrimeraCadena} = require("../helpers");
const {Cargo} =require('../models');

const getCargos =async(req=request,res=response)=>{
    try {
        const cargo = await Cargo.findAll();
        res.json({
            ok:true,
            msg:'Se mostro los cargos con exito',
            cargo
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const getCargo =async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const cargo = await Cargo.findOne({
            where:{
                id
            }
        })
        res.json({
            ok:true,
            msg:'Se mostro el cargo con exito',
            cargo
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const postCargo =async(req=request,res=response)=>{
    try {
        const {descripcion,...data} = req.body;
        const cargos = siglaFun(descripcion);
        const descrip = mayusPrimeraCadena(descripcion,' ')
        data.descripcion = descrip;
        data.cargo =cargos;
        const cargo = await Cargo.create(data);
        res.json({
            ok:true,
            msg:'Se creo el cargo con exito',
            cargo
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const updateCargo =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const deleteCargo =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}







module.exports = {
    getCargos,
    getCargo,
    postCargo,
    updateCargo,
    deleteCargo
}