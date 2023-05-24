const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");

const registrarAlertaGenerada = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('registrar-alerta-generada',()=>{
        cliente.broadcast.emit('registrar-alerta-generada')
    })
}
module.exports = {
    registrarAlertaGenerada
}