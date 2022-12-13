const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { TipoAtencion } = require("../models");

const getTipoAtenciones = async (req = request, res = response) => {
  try {
    const {estado}=req.query;
    const tipoAtencion = await TipoAtencion.findAll({
      where:{
        estado
      }
    })
    res.json({
      ok: true,
      msg:'Se muestra los tipo de atencion con exito',
      tipoAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const getTipoAtencion = async (req = request, res = response) => {
  try {
    const {id}= req.params;
    const tipoAtencion = await TipoAtencion.findOne({
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:'Se muestra el tipo de atencion con exito',
      tipoAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const postTipoAtencion = async (req = request, res = response) => {
  try {
    const {nombre,...data} = req.body;
    const file = req.files;
    data.nombre = nombre.toUpperCase();
    const img = await subirArchivo(file,undefined,'tipo-atencion');
    data.img = img;
    const tipoAtencion = await TipoAtencion.create(data);
    res.json({
      ok: true,
      msg:'Se guardo el tipo de atencion con exito',
      tipoAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const putTipoAtencion = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {nombre,...data} = req.body;
    data.nombre = nombre.toUpperCase();
    const tipoAtencion = await TipoAtencion.update(data, {
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:'Se actualizo el tipo de atencion con exito',
      tipoAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const deleteTipoAtencion = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const {id} = req.params;
    const tipoAtencion = await TipoAtencion.update({
      estado
    },{
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:(estado === '0')?'Se bloqueo el tipo de atencion con exito':'Se desbloqueo el tipo de atencion con exito',
      tipoAtencion
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

module.exports = {
  getTipoAtenciones,
  getTipoAtencion,
  postTipoAtencion,
  putTipoAtencion,
  deleteTipoAtencion,
};
