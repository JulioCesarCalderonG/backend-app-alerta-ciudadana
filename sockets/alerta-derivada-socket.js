const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const jwt = require('jsonwebtoken');


const AlertaDerivadaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('alerta-derivada',(payload, callback)=>{
        console.log(`alerta-derivada-${payload.usuario}`);
        cliente.broadcast.emit(`alerta-derivada-${payload.usuario}`,payload);
    });
}

const actualizarAlertaDerivada = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('actualizar-alerta-derivada',()=>{
        cliente.broadcast.emit('actualizar-alerta-derivada');
    });
}

const borrarAlertaDerivada = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('borrar-alerta-derivada',()=>{
        cliente.broadcast.emit('borrar-alerta-derivada');
    });
}

module.exports = {
    AlertaDerivadaSocket,
    actualizarAlertaDerivada,
    borrarAlertaDerivada
}