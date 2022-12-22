const { request, response } = require("express");
const { CentroAtencion, Usuario, TipoAtencion } = require("../models");

const getCentroAtenciones = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const centroAtencion = await CentroAtencion.findAll({
      where:{
        estado
      },
      include:[
        {
          model:TipoAtencion
        }
      ]
    })
    res.json({
      ok: true,
      msg:'Se muestra todos los centros de atencion',
      centroAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const getCentroAtencion = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const centroAtencion = await CentroAtencion.findOne({
      where:{
        id
      },
      include:[
        {
          model:TipoAtencion
        }
      ]
    })
    res.json({
      ok: true,
      msg:`Se muestra el centro de atencion con el id: ${id}`,
      centroAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const postCentroAtencion = async (req = request, res = response) => {
  try {
    const usuario = req.usuarioToken;
    const {titulo,direccion,...data} =req.body;
    data.titulo = titulo.toUpperCase();
    data.direccion = direccion.toUpperCase();
    data.id_usuario= usuario.id;
    const centroAtencion = await CentroAtencion.create(data);
    res.json({
      ok: true,
      msg:'Se agrego el centro de atencion con exito',
      centroAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const putCentroAtencion = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {direccion,lat,lng,...data} =req.body;
    data.lat = Number(lat);
    data.lng = Number(lng);
    data.direccion = direccion.toUpperCase();
    const centroAtencion = await CentroAtencion.update(data, {
      where:{
        id
      }
    });
    res.json({
      ok: true,
      msg:`Se actualizo el centro de atencion con exito`,
      centroAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const deleteCentroAtencion = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} = req.query;
    const centroAtencion = await CentroAtencion.update({
      estado
    },{
      where:{
        id
      }
    });
    res.json({
      ok: true,
      msg:(estado === '0') ? 'Se bloqueo el centro de atencion' :'Se desbloqueo el centro de atencion',
      centroAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

module.exports = {
  getCentroAtenciones,
  getCentroAtencion,
  postCentroAtencion,
  putCentroAtencion,
  deleteCentroAtencion,
};
