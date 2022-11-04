const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const { Ciudadano } = require('../models');
//const Usuario = require('../models/usuario');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const ciudadano = await Ciudadano.findOne({
            where:{
                id
            }
        });

        if (!ciudadano) {
            return res.json({
                ok:false,
                msg: 'Token no valido - ciudadano no existe en BD',
                ciudadano:null,
                token:null
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!ciudadano.estado) {
            return res.json({
                ok:false,
                msg: 'Token no valido - ciudadano no existe en BD',
                ciudadano:null,
                token:null
            })
        }
        req.ciudadanoToken = ciudadano;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
module.exports = {
    validarJWT  
}