const { request, response } = require("express");
const { DetalleCiudadano } = require("../models");

const getDetalleCiudadanos = async (req = request, res = response) => {
  try {
    const detalleCiudadano = await DetalleCiudadano.findAll();
    res.json({
      ok: true,
      msg: "Datos de ciudadano mostrado con exito",
      detalleCiudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getDetalleCiudadano = async (req = request, res = response) => {
  try {
    const ciudadano = req.ciudadanoToken;
    const detalleCiudadano = await DetalleCiudadano.findOne({
      where: {
        id_ciudadano: ciudadano.id,
      },
    });
    res.json({
      ok: true,
      msg: "Datos de ciudadano mostrado con exito",
      detalleCiudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postDetalleCiudadano = async (req = request, res = response) => {
  try {
    const ciudadano = req.ciudadanoToken;
    const data = req.body;
    data.id_ciudadano = ciudadano.id;
    let detalleCiudadano;
    //validamos si existe el detalle del usuario
    const resp = await DetalleCiudadano.findOne({
      where: {
        id_ciudadano: ciudadano.id,
      },
    });

    if (resp) {
      console.log("existe");
      detalleCiudadano = await DetalleCiudadano.update(data, {
        where: {
          id: resp.id,
        },
      });
    } else {
      console.log("no existe");
      detalleCiudadano = await DetalleCiudadano.create(data);
    }

    res.json({
      ok: true,
      msg: "Se actualizaron los datos con exito",
      detalleCiudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const putDetalleCiudadano = async (req = request, res = response) => {};

module.exports = {
  getDetalleCiudadanos,
  getDetalleCiudadano,
  postDetalleCiudadano,
  putDetalleCiudadano,
};
