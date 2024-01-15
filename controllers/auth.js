const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers");
const { Ciudadano } = require("../models");

const postLogin = async (req = request, res = response) => {
  try {
    const { coleccion } = req.params;
  let password;
  let usuario;
  let validarPassword;
  let token;
  switch (coleccion) {
    case "ciudadano":
      usuario = req.body.usuario;
      password = req.body.password;
      const resp = await Ciudadano.findOne({
        where: {
          usuario,
        },
      });
      if (!resp) {
        return res.json({
          ok: false,
          msg: "Ciudadano no registrado, por favor registrese",
          user: null,
          token: null,
        });
      }
      if (!resp.estado) {
        return res.json({
          ok: false,
          msg: "Ciudadano bloqueado, converse con la municipalidad",
          user: null,
          token: null,
        });
      }
      validarPassword = bcryptjs.compareSync(password, resp.password);
      if (!validarPassword) {
        return res.json({
          ok: false,
          msg: "Contraseña no valida",
          user: null,
          token: null,
        });
      }
      token = await generarJWT(resp.id);
      res.json({
        ok: true,
        msg: "Login correcto",
        ciudadano: resp,
        token,
      });
      break;
    default:
      break;
  }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
const validarTokenCiudadano = async (req = request, res = response) => {
  // Generar el JWT
  try {
    const user = req.ciudadanoToken;
    const token = await generarJWT(user.id);
    res.json({
      ok: true,
      msg:'se valido el usuario con exito',
      ciudadano:user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  postLogin,
  validarTokenCiudadano,
};
