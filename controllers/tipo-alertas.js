const { response, request } = require("express");
const fs = require("fs");
const path = require("path");
const { subirArchivo } = require("../helpers");

const { TipoAlerta, OpcionFoto } = require("../models");

const getTipoAlertas = async (req = request, res = response) => {

  try {
    const { estado } = req.query;
    const tipoalerta = await TipoAlerta.findAll({
      where: {
        estado,
      },
      include:{
        model:OpcionFoto
      }
    });
    res.json({
      ok: true,
      msg: "Se muestran todas las alertas",
      tipoalerta,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getTipoAlerta = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const tipoalerta = await  TipoAlerta.findOne({
      where:{
        id
      },
      include:{
        model:OpcionFoto
      }
    })
    res.json({
      ok: true,
      msg:`Se muestran el tipo de alerta con el id: ${id}`,
      tipoalerta
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarImagenTipoAlerta = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const tipoalerta = await TipoAlerta.findOne({
      where: {
        id,
      },
    });
    if (!tipoalerta) {
      const respuesta = path.join(__dirname, "../assets/", "no-photo.jpg");
      return res.sendFile(respuesta);
    }
    const pathImagen = path.join(
      __dirname,
      "../uploads/",
      "tipos-alertas",
      tipoalerta.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    } else {
      const pathDefault = path.join(__dirname, "../assets/", "no-photo.jpg");
      return res.sendFile(pathDefault);
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postTipoAlerta = async (req = request, res = response) => {
  try {
    const { nombre, opcion, ...data } = req.body;
  
    data.nombre = nombre.toUpperCase();
    const tipoalerta = await TipoAlerta.create(data);
    res.json({
      ok: true,
      msg: "Tipo de alerta creada con exito",
      tipoalerta,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const putTipoAlerta = async (req = request, res = response) => {
  try {
    const { nombre, opcion, ...data } = req.body;
    const {id} = req.params;
    data.nombre = nombre.toUpperCase();
    data.opcion_foto=opcion;
    const tipoAlerta = await TipoAlerta.update(data,{
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:`Se actualizo el tipo alerta con el id ${id}`,
      tipoAlerta
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const deleteTipoAlerta = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const {id} = req.params;
    const tipoAlerta = await TipoAlerta.update({
      estado
    },{
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:(estado === '0')?'Se bloqueo el tipo de alerta con exito':'Se desbloqueo el tipo de alerta con exito',
      tipoAlerta
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  getTipoAlertas,
  getTipoAlerta,
  mostrarImagenTipoAlerta,
  postTipoAlerta,
  putTipoAlerta,
  deleteTipoAlerta,
};
