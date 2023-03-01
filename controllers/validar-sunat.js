const { request, response } = require("express");
const sunatApi = require("../api-sunat/apiSunat");

const validarDNISunat = async (req = request, res = response) => {
  try {
    const { dni } = req.body;
    const datos = {};
    const { data } = await sunatApi.get("/v1/dni", {
      params: {
        numero: dni,
      },
    });
    datos.nombre = data.nombres;
    datos.apellido =`${data.apellidoPaterno} ${data.apellidoMaterno}`;
    datos.dni=dni;
    
    res.json({
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
  ValidarGetSunat
};
