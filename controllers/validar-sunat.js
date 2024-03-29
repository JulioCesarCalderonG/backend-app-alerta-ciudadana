const { request, response } = require("express");
const sunatApi = require("../api-sunat/apiSunat");
const {Ciudadano, Usuario} = require("../models");

const validarDNISunat = async (req = request, res = response) => {
  try {
    const { dni } = req.body;
    const ciudadano= await Ciudadano.findOne({
      where:{
        dni
      }
    });
    if (ciudadano) {
      return res.json({
        ok:false,
        msg:'Usted ya se registro, inicie sesion en el login o recupere su contraseña segun sea el caso',
        datos:null
      })
    }
    const datos = {};
    const { data } = await sunatApi.get("/v1/dni", {
      params: {
        numero: dni,
      },
    });
    datos.nombre = data.nombres;
    datos.apellido =`${data.apellidoPaterno} ${data.apellidoMaterno}`;
    datos.dni=dni;
    
    return res.json({
      ok: true,
      msg:`Se valido los datos del DNI correctamente`,
      datos
    });
  } catch (error) {
    res.status(400).json({
        ok:false,
        error:`${error}`
    })
  }
};
const validarDNISunatUsuario = async (req = request, res = response) => {
  try {
    const { dni } = req.body;
    const usuario= await Usuario.findOne({
      where:{
        dni
      }
    });
    if (usuario) {
      return res.json({
        ok:false,
        msg:'El usuario ya ha sido registrado en la base de datos',
        datos:null
      })
    }
    const datos = {};
    const { data } = await sunatApi.get("/v1/dni", {
      params: {
        numero: dni,
      },
    });
    datos.nombre = data.nombres;
    datos.apellido =`${data.apellidoPaterno} ${data.apellidoMaterno}`;
    datos.dni=dni;
    
    return res.json({
      ok: true,
      msg:`Se valido los datos del DNI correctamente`,
      datos
    });
  } catch (error) {
    res.status(400).json({
        ok:false,
        error:`${error}`
    })
  }
};
const ValidarGetSunat=async (req = request, res = response) =>{
  try {
    const {dni} = req.params;
    const datos = {};
    const {data} = await sunatApi.get("v1/dni",{
      params:{
        numero:dni
      }
    });
    datos.nombre = data.nombres;
    datos.apellido =`${data.apellidoPaterno} ${data.apellidoMaterno}`;
    datos.dni=dni;
    res.json({
      ok:true,
      msg:'Dni Validado',
      datos
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      error:`${error}`
  })
  }
}
module.exports = {
  validarDNISunat,
  ValidarGetSunat,
  validarDNISunatUsuario
};
