const Usuario = require("./usuario");

class UsuariosLista {

     lista=[];


    constructor() { }

    // Agregar un usuario
    agregar( usuario = Usuario ) {

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario
    }
    actualizarNombre( id= '', nombre= '' ) {

        for( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }

        }


        console.log('===== Actualizando usuario ====');
        console.log( this.lista );

    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    // Obtener un usuario
    getUsuario( id= '' ) {

        return this.lista.find( usuario => usuario.id === id );

    }

    // Obtener usuario en una sala en particular
    getUsuariosEnSala( sala= '' ) {

        return this.lista.filter( usuario =>usuario.sala === sala );

    }

    // Borrar Usuario
    borrarUsuario( id= '' ) {

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
        
    }
}

module.exports = UsuariosLista