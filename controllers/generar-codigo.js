const { request, response } = require("express");
const { Ciudadano, DetalleCiudadano } = require("../models");
const { enviarCodigo } = require("../helpers");


const postGenerarCodigo=async(req=request,res=response)=>{
    try {
        const {dni,correo} = req.body;

        const ciudadano = await Ciudadano.findOne({
            where:{
                dni
            }
        });
        if (!ciudadano) {
            return res.status(400).json({
                ok:false,
                msg:'El dni no tiene una cuenta registrada'
            })
        }
        const detalle= await DetalleCiudadano.findOne({
            where:{
                id_ciudadano:ciudadano.id
            }
        });
        if (!detalle) {
            return res.status(400).json({
                ok:false,
                msg:'La cuenta no esta asociada a un correo, porfavor ingrese al aplicativo e ingrese un correo para seguir con la eliminacion de la cuenta'
            })
        }
        if (correo!==detalle.correo) {
            return res.status(400).json({
                ok:false,
                msg:'El correo ingresado es diferente al asociado a su cuenta, verificar el correo ingresado'
            })
        }
        const codigo= Math.floor(Math.random()*16777215).toString(16);
        const email = await enviarCodigo(detalle.correo,codigo.toUpperCase())
        res.json({
            ok:true,
            codigo: codigo.toUpperCase(),
            ciudadano
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}

const eliminarCuenta=async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const resp = await Ciudadano.findOne({
            where:{
                id
            }
        })
        if (!resp) {
            return res.status(400).json({
                ok:false,
                msg:'No tienes una cuenta registrada'
            })
        }
        const detalle = await DetalleCiudadano.destroy({
            where:{
                id_ciudadano:id
            }
        });
        const ciudadano = await Ciudadano.destroy({
            where:{
                id
            }
        });
        res.json({
            ok:true,
            msg:'Se elimino su cuenta con exito'
        });
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}

module.exports = {
    postGenerarCodigo,
    eliminarCuenta
};