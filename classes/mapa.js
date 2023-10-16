const Marcador = require("./marcador");

class Mapa {
  marcadores = {
    '1':{
        id :'1',
        nombre:'Julio cesar',
        vehiculo:'vehiculo 1',
        lng:-74.562492,
        lat:-8.362674,
        color:'#dd8fee'
    },
    '2':{
        id :'2',
        nombre:'Juanito perez',
        vehiculo:'vehiculo 2',
        lng:-74.588585,
        lat:-8.383223,
        color:'#790af0'
    },
    '3':{
        id :'3',
        nombre:'Pedro suarez',
        vehiculo:'vehiculo 3',
        lng:-74.58292,
        lat:-8.411074,
        color:'#19884b'
    }
  };
  constructor() {}

  agregarMarcador(marcador = Marcador) {
    this.marcadores[marcador.id] = marcador;
  }
  getMarcadores() {
    return this.marcadores;
  }
  borrarMarcador(id = "") {
    delete this.marcadores[id];
    return this.getMarcadores;
  }
  moverMarcador(marcador = {}) {
    this.marcadores[marcador.id].lng = marcador.lng;
    this.marcadores[marcador.id].lat = marcador.lat;
  }
}

module.exports = Mapa;