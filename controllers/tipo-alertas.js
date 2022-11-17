const { response, request } = require("express");
const fs = require("fs");
const path = require("path");
const { subirArchivo } = require("../helpers");

const { TipoAlerta } = require("../models");

const getTipoAlertas = async (req = request, res = response) => {
  const { estado } = req.query;
  const tipoalerta = await TipoAlerta.findAll({
    where: {
      estado,
    },
  });
  try {
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
    res.json({
      ok: true,
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
      const respuesta = path.join(__dirname, "../assets/", "no-image.png");
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
      const pathDefault = path.join(__dirname, "../assets/", "no-image.png");
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
    const { nombre, ...data } = req.body;
    const file = req.files;
    const img = await subirArchivo(
      file,
      ["png", "jpg", "jpeg", "gif"],
      "tipos-alertas"
    );
    data.nombre = nombre.toUpperCase();
    data.img = img;
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
    res.json({
      ok: true,
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
    res.json({
      ok: true,
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
