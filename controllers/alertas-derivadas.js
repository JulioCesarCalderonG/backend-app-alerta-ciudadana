const { request, response } = require("express");
const { AlertaDerivada, Alerta, Usuario, Ciudadano, TipoAlerta, DetalleCiudadano } = require("../models");
const { Op } = require("sequelize");


const getAlertaDerivadas=async (req = request, res = response) =>{
    try {
        const {tipo} = req.query;
        const alertaDerivada = await AlertaDerivada.findAll(
            {
                where:{
                    atencion:tipo
                },
                include:[
                    {
                        model:Alerta,
                        as:'derivadaalerta',
                        
                    },
                    {
                        model:Usuario,
                        as:'derivadausuario'
                    }
                ]
            }
        );
        res.json({
            ok:true,
            msg:'Se muestran las alertas derivadas con exito',
            alertaDerivada
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:`${error}`
        })
    }
}
const getAlertaDerivadasUsuario=async (req = request, res = response) =>{
    try {
        const {id} = req.usuarioToken;
        const alertaDerivada = await AlertaDerivada.findAll(
            {
                attributes:['id'],
                where:{
                    [Op.and]: [
                        { id_usuario: id },
                        { atencion:0}
                      ]  
                },
                include:[
                    {
                        model:Alerta,
                        as:'derivadaalerta',
                        
                    },
                    {
                        model:Usuario,
                        as:'derivadausuario'
                    }
                ]
            }
        );
        let array=[];
        if (alertaDerivada) {
            for (let i = 0; i < alertaDerivada.length; i++) {
                //const opt={};
                const resp = await DetalleCiudadano.findOne({
                    where:{
                        id_ciudadano:alertaDerivada[i].Alertum.ciudadano
                    }
                });
                const opt={
                    id:alertaDerivada[i].id,
                    Alertum:alertaDerivada[i].Alertum,
                    Usuario:alertaDerivada[i].Usuario,
                    detalle:resp
                }
                array.push(opt)    
            }
        }

        res.json({
            ok:true,
            msg:'Se muestran las alertas derivadas con exito',
            alertaDerivada:array
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
        const {id} = req.params;
        const alertaDerivada = await AlertaDerivada.findOne({
            where:{
                id
            },
            include:[
                    {
                        model:Alerta,
                        as:'derivadaalerta',
                        
                    },
                    {
                        model:Usuario,
                        as:'derivadausuario'
                    }
                ]
        })
        res.json({
            ok:true,
            msg:'Se muestran la alerta derivada con exito',
            alertaDerivada
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
            msg:'Se derivo la alerta con exito',
            alertaDerivada
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
        const data = req.body;
        const {id} = req.params;
        const alertaDerivada = await AlertaDerivada.update(data,{
            where:{
                id
            }
        })
        res.json({
            ok:true,
            msg:'Se actualizo con exito la alerta',
            alertaDerivada
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
        const {id} = req.params;
        const alertaDerivada = await AlertaDerivada.destroy({
            where:{
                id
            }
        });
        res.json({
            ok:true,
            msg:'Se elimino la alerta derivada con exito',
            alertaDerivada
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
    getAlertaDerivadasUsuario,
    postAlertaDerivada,
    putAlertaDerivada,
    deleteAlertaDerivada
}