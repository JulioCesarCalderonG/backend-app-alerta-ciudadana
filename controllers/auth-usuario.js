const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const {generarJWT, generarJWTUsuario} = require("../helpers");
const { Usuario, Cargo } = require("../models");

const authUsuario = async (req = request, res = response) => {
  try {
    const { password, dni } = req.body;
    const resp = await Usuario.findOne({
      where: {
        dni
      },
      include:{
        model:Cargo
      }
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "Usuario no registrado, por favor registrese",
        user: null,
        token: null,
      });
    }
    if (!resp.estado) {
      return res.json({
        ok: false,
        msg: "Usuario bloqueado, converse con la municipalidad",
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
    const usuario = await Usuario.update({
      disponible:1
    },{
      where:{
        id:resp.id
      }
    });
    token = await generarJWTUsuario(resp.id, resp.Cargo.cargo);
    res.json({
        ok: true,
        msg: "Login correcto",
        usuario:resp,
        token,
      });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const logoutUsuario = async (req = request, res = response)=>{
  try {
    const {id} = req.usuarioToken;
    const usuario = await Usuario.update({
      disponible:0
    },{
      where:{
        id
      }
    });

    res.json({
      ok:true,
      msg:'Se cerro sesion del usuario',
      usuario
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}
module.exports = {
  authUsuario,
  logoutUsuario,
};
