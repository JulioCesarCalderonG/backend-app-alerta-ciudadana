const { request, response } = require("express");
const { Ciudadano } = require("../models");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers");
const jwt = require("jsonwebtoken");
const getCiudadanos = async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const ciudadano = await Ciudadano.findAll({
      where: {
        estado,
      },
    });
    res.json({
      ok: true,
      msg: "Ciudadanos mostrados con exito",
      ciudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getCiudadano = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const ciudadano = Ciudadano.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: `Se mostro al ciudadano con el id: ${id}`,
      ciudadano,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postCiudadano = async (req = request, res = response) => {
  try {
    const { password, dni, ...data } = req.body;

    // Verificamos si el ciudadano ya esta registrado
    const resp = await Ciudadano.findOne({
      where: {
        dni,
      },
    });
    if (resp) {
      return res.status(400).json({
        ok: false,
        msg: `El dni ya esta registrado en el sistema`,
      });
    }

    // Validamos el password
    if (password.length <= 6) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña debe ser mayor a 6 caracteres",
      });
    }
    // Creamos un password Hasheado
    const salt = bcryptjs.genSaltSync();
    const hasPassword = bcryptjs.hashSync(password, salt);
    data.password = hasPassword;
    data.dni = dni;
    // Realizamos la subida del usuario al BD
    const ciudadano = await Ciudadano.create(data);

    // Generamos un token al nuevo usuario
    const token = await generarJWT(ciudadano.id);

    res.json({
      ok: true,
      msg: "Se registro el usuario con exito",
      ciudadano,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const updateCiudadano = async (req = request, res = response) => {
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

const deleteCiudadano = async (req = request, res = response) => {
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

const actualizarPassword = async (req = request, res = response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el ciudadano

    const ciudadano = await Ciudadano.findOne({ id });

    if (!ciudadano) {
      return res.json({
        ok: false,
        msg: "Token no valido - ciudadano no existe en BD",
        ciudadano: null,
        token: null,
      });
    }
    // Verificar si el uid tiene estado en tru
    if (!ciudadano.estado) {
      return res.json({
        ok: false,
        msg: "Token no valido - ciudadano no existe en BD",
        ciudadano: null,
        token: null,
      });
    }
    // Creamos un password Hasheado
    const salt = bcryptjs.genSaltSync();
    const hasPassword = bcryptjs.hashSync(password, salt);
    const resp = await Ciudadano.update({password:hasPassword}, {where:{
      id:ciudadano.id
    }})
    
    res.json({
      ok: true,
      msg:'Password Actualizado',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
module.exports = {
  getCiudadanos,
  getCiudadano,
  postCiudadano,
  updateCiudadano,
  deleteCiudadano,
  actualizarPassword,
};
