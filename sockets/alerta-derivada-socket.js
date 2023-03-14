const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const jwt = require('jsonwebtoken');


const AlertaDerivadaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('alerta-derivada',(payload, callback)=>{
        console.log(`alerta-derivada-${payload.usuario}`);
        cliente.broadcast.emit(`alerta-derivada-${payload.usuario}`,payload);
    });
}

module.exports = {
    AlertaDerivadaSocket
}