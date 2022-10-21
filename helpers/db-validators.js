const { Ciudadano } = require("../models")



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



module.exports = {
    validarDNICiudadano
}