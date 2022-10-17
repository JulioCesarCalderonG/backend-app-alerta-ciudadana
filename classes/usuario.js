class Usuario {

    id= '';
    nombre= '';
    sala= '';

    constructor( id= '' ) { 
        
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala   = 'sin-sala';

    }

}

module.exports = Usuario