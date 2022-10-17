const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const usuario = await Usuario.findOne({_id: id});

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.usuarioToken = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
module.exports = {
    validarJWT  
}