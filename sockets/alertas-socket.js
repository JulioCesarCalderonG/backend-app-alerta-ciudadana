const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const jwt = require('jsonwebtoken');


const actualizarAlertaCiudadano = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('actualizar-alerta-ciudadano',(token='')=>{
        cliente.emit('actualizar-alerta-ciudadano',token)
    })
}

module.exports = {
    actualizarAlertaCiudadano
}