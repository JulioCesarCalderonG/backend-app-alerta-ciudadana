const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarToken = require("../helpers/generar-jwt");

const postLogin = async (req = request, res = response) => {
    const { coleccion } = req.params;
    let password;
    let usuario;
    let validarPassword;
    let token;
    switch (coleccion) {
      case "usuario":
        usuario = req.body.usuario;
        password = req.body.password;
        const user = await Usuario.findOne({ usuario });
        if (!user) {
          return res.json({
            ok: false,
            msg: "Usuario no existe, converse con el administrador",
            user: null,
            token: null,
          });
        }
        if (!user.estado) {
          return res.json({
            ok: false,
            msg: "Usuario bloqueado, converse con el administrador",
            user: null,
            token: null,
          });
        }
        validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
          return res.json({
            ok: false,
            msg: "Contraseña no valida",
            user: null,
            token: null,
          });
        }
        token= await generarToken.generarJWT(user._id);
        res.json({
          ok: true,
          msg: "Login correcto",
          user,
          token
        });
        break;
      default:
        break;
    }
  };

  module.exports = {
      postLogin
  }