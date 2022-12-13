const { Ciudadano, TipoAlerta, Usuario, TipoAtencion } = require("../models")



const validarDNICiudadano =async(dni='')=>{
    const resp = await Ciudadano.findOne({
        where:{
            dni
        }
    });
    if (resp) {
        throw new Error(`El dni: ${dni} ya está registrado en el sistema`);
    }
}
const nombreTipoAlerta = async(nombre='')=>{

    const resp = await TipoAlerta.findOne({
        where:{
            nombre:nombre.toUpperCase()
        }
    });
    if (resp) {
        throw new Error(`El tipo de alerta: ${nombre} ya está registrado en el sistema`);
    }
}
const validarDNIUsuario =async(dni='')=>{
    const resp = await Usuario.findOne({
        where:{
            dni
        }
    });
    if (resp) {
        throw new Error(`El dni: ${dni} ya está registrado en el sistema`);
    }
}
const nombreTipoAtencion =async(nombre='')=>{
    const resp = await TipoAtencion.findOne({
        where:{
            nombre
        }
    });
    if (resp) {
        throw new Error(`El tipo de atencion: ${nombre} ya está registrado en el sistema`);
    }
}


module.exports = {
    validarDNICiudadano,
    nombreTipoAlerta,
    validarDNIUsuario,
    nombreTipoAtencion
}