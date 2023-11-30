

const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const Mapa = require('../classes/mapa');
const Marcador = require("../classes/marcador");
const mapa = new Mapa();

const mapaSockets = ( cliente= Socket, io= socketIO.Server ) => {

    cliente.on('vehiculo-nuevo',(marcador=Marcador,token='')=>{
            mapa.agregarMarcador(marcador);

            cliente.broadcast.emit('vehiculo-nuevo',marcador);
    })
    cliente.on('vehiculo-borrar',(id='')=>{
            mapa.borrarMarcador(id);
            cliente.broadcast.emit('vehiculo-borrar',id);
    })
    cliente.on('vehiculo-mover',(marcador=Marcador)=>{
        mapa.moverMarcador(marcador)
        cliente.broadcast.emit('vehiculo-mover',marcador);
})
}
module.exports = {
    mapaSockets,
    mapa
}

