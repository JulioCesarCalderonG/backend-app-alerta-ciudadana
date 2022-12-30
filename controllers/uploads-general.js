const { request, response } = require("express");
const path = require("path");
const fs = require("fs");
const { TipoAtencion, TipoAlerta } = require("../models");
const { subirArchivo } = require("../helpers");

const mostrarTipoAtencion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await TipoAtencion.findOne({
      where: {
        id,
      },
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "no se encuentra el tipo de atencion",
      });
    }
    if (resp.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "tipo-atencion",
        resp.img
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarTipoAlerta = async (req = request, res = response) => {
  try {
    const { id, nombre } = req.params;
    const resp = await TipoAlerta.findOne({
      where: {
        id,
        img:nombre
      },
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "no se encuentra el tipo de alerta",
      });
    }
    if (resp.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "tipos-alertas",
        resp.img
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const putUploadTipoAtencion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const file = req.files;
    const resp = await TipoAtencion.findOne({
      where: {
        id,
      },
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "no se encuentra el tipo de atencion",
      });
    }
    if (resp.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "tipo-atencion",
        resp.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const img = await subirArchivo(file, undefined, "tipo-atencion");
    resp.img = img;
    const tipoAtencion = await resp.save();
    res.json({
      ok: true,
      msg: "Se actualizo la imagen con exito",
      tipoAtencion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const putUploadTipoAlerta = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const file = req.files;
    const resp = await TipoAlerta.findOne({
      where: {
        id,
      },
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "no se encuentra el tipo de atencion",
      });
    }
    if (resp.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "tipos-alertas",
        resp.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const img = await subirArchivo(file, undefined, "tipos-alertas");
    resp.img = img;
    const tipoAtencion = await resp.save();
    res.json({
      ok: true,
      msg: "Se actualizo la imagen con exito",
      tipoAtencion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

module.exports = {
  putUploadTipoAtencion,
  mostrarTipoAtencion,
  putUploadTipoAlerta,
  mostrarTipoAlerta
};
