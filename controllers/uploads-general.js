const { request, response } = require("express");
const path = require("path");
const fs = require("fs");
const { TipoAtencion, TipoAlerta, DetalleCiudadano, Alerta } = require("../models");
const { subirArchivo } = require("../helpers");

const mostrarImagenAlerta = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Alerta.findOne({
      where: {
        id
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.png");
      return res.sendFile(pathImagenDefault);
    }
    
    if (resp.foto) {
      const pathImagen = path.join(__dirname,"../uploads","alertas",resp.foto);
      return res.sendFile(pathImagen);
    }
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.png");
      return res.sendFile(pathImagenDefault); 
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const mostrarTipoAtencion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await TipoAtencion.findOne({
      where: {
        id,
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.png");
      return res.sendFile(pathImagenDefault);
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
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.png");
      return res.sendFile(pathImagenDefault);
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
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.png");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarImageCiudadano = async (req = request, res = response) => {
  try {
    const ciudadano = req.ciudadanoToken;
    const resp = await DetalleCiudadano.findOne({
      where: {
        id_ciudadano:ciudadano.id
      },
    });
    if (!resp) {
      const pathImagenDefaults = path.join(__dirname, "../assets/no-photo.jpg");
      return res.sendFile(pathImagenDefaults);
    }
    if (resp.imagen) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "detalle-ciudadano",
        resp.imagen
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-photo.jpg");
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
const putUploadCiudadano = async (req = request, res = response) => {
  try {
    const ciuda = req.ciudadanoToken;
    const file = req.files;
    const resp = await DetalleCiudadano.findOne({
      where: {
        id_ciudadano:ciuda.id
      },
    });
    console.log(resp);
    if (!resp) {
      const img = await subirArchivo(file, undefined, 'detalle-ciudadano');
      const data = {};
      data.imagen = img;
      data.id_ciudadano = ciuda.id;
      const ciudadano = await DetalleCiudadano.create(data);
      return res.json({
        ok: true,
        msg: 'Se actualizo la imagen con exito',
        ciudadano
      });
    }
    if (resp.imagen) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "detalle-ciudadano",
        resp.imagen
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    
    const img = await subirArchivo(file, undefined, "detalle-ciudadano");
    resp.imagen = img;
    const ciudadano = await resp.save();
    res.json({
      ok: true,
      msg: "Se actualizo la imagen con exito",
      ciudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
module.exports = {
  mostrarImagenAlerta,
  putUploadTipoAtencion,
  mostrarTipoAtencion,
  putUploadTipoAlerta,
  mostrarTipoAlerta,
  mostrarImageCiudadano,
  putUploadCiudadano
};
