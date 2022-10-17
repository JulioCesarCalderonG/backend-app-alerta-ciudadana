const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const  Usuario  = require("../classes/usuario");
const UsuariosLista = require("../classes/usuario-lista");

const usuariosConectados = new UsuariosLista();


const conectarCliente = ( cliente= Socket, io= socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

module.exports = {
    conectarCliente
}