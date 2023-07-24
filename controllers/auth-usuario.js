const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const {generarJWT, generarJWTUsuario, funDate, generarJWTUsuarioDos} = require("../helpers");
const { Usuario, Cargo, ControlPersonal } = require("../models");

const authUsuario = async (req = request, res = response) => {
  try {
    const { password, dni } = req.body;
    const {fecha,hora}= funDate();
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
    const enviPersonal= {
      id_usuario:resp.id,
      fechaingreso:fecha,
      horaingreso:hora
    }
    const cpersonal = await ControlPersonal.create(enviPersonal);
    token = await generarJWTUsuario(resp.id, resp.Cargo.cargo);
    res.json({
        ok: true,
        msg: "Login correcto",
        usuario:resp,
        token,
        id_control:cpersonal.id
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
    const {control} =req.query;
    const {fecha,hora} = funDate();
    const usuario = await Usuario.update({
      disponible:0
    },{
      where:{
        id
      }
    });
    const datacontrol = {
      fechasalida:fecha,
      horasalida:hora
    }
    const resp = await ControlPersonal.update(datacontrol,{
      where:{
        id:control
      }
    })
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
const validarTokenUsuario = async (req = request, res = response) => {
  try {
    const user = req.usuarioToken;
    const token = await generarJWTUsuarioDos(user.id);
    res.json({
      ok: true,
      msg:'se valido el usuario con exito',
      usuario:user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  authUsuario,
  logoutUsuario,
  validarTokenUsuario
};
