const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const jwt = require('jsonwebtoken');


const loginUser = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('inicio-sesion',()=>{
        cliente.broadcast.emit('inicio-sesion')
    })
}
const logoutUser = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('logout-sesion',()=>{
        cliente.broadcast.emit('logout-sesion')
    })
}
module.exports = {
    loginUser,
    logoutUser
}