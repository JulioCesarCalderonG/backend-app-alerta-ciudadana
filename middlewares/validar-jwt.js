const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const { Ciudadano, Usuario } = require('../models');
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
                msg: 'Token no valido - usted ha sido bloqueado por la MPCP',
                ciudadano:null,
                token:null
            })
        }
        // Verificar si el uid tiene estado en tru
        if (ciudadano.estado===0) {
            return res.json({
                ok:false,
                msg: 'Token no valido - usted ha sido bloqueado por la MPCP',
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
const validarJWTParams =async (req= request, res = response, next)=>{ 
    const {token} = req.query;
    console.log(token);
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
const validarJWTUsuario =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario
        const usuario = await Usuario.findOne({
            where:{
                id
            }
        });
        if (!usuario) {
            return res.json({
                ok:false,
                msg: 'Token no valido - usuario no existe en BD',
                usuario:null,
                token:null
            })
        }
        // Verificar si el uid tiene estado en tru
        if (usuario.estado===0) {
            return res.json({
                ok:false,
                msg: 'Token no valido - usuario no existe en BD',
                usuario:null,
                token:null
            })
        }
        req.usuarioToken = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
const validarJWTUsuarioParams =async (req= request, res = response, next)=>{ 
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id,vehiculo} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario
        const usuario = await Usuario.findOne({
            where:{
                id
            }
        });
        if (!usuario) {
            return res.json({
                ok:false,
                msg: 'Token no valido - usuario no existe en BD',
                usuario:null,
                token:null
            })
        }
        // Verificar si el uid tiene estado en tru
        if (usuario.estado===0) {
            return res.json({
                ok:false,
                msg: 'Token no valido - usuario no existe en BD',
                usuario:null,
                token:null
            })
        }
        req.usuarioToken = usuario;
        req.vehiculoToken= vehiculo;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
module.exports = {
    validarJWT,
    validarJWTUsuario,
    validarJWTParams,
    validarJWTUsuarioParams
}