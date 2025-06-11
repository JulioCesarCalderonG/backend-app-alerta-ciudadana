const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const {generarJWT, generarJWTUsuario, funDate, generarJWTUsuarioDos} = require("../helpers");
const { Usuario, Cargo, ControlPersonal, Vehiculo } = require("../models");

const authUsuario = async (req = request, res = response) => {
  try {
    const { password, dni } = req.body;
    const {fecha,hora}= funDate();
    const resp = await Usuario.findOne({
      where: {
        dni
      },
      include:
        {
        model:Cargo,
        as:'cargousuario'
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
    if (resp.cargousuario.cargo==='UN') {
      return res.json({
        ok: false,
        msg: "Usted no es un usuario administrador",
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
    token = await generarJWTUsuario(resp.id, resp.cargousuario.cargo);
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
      msg: `${error}-aca`,
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
const authUsuarioSerenazgo = async (req = request, res = response) => {
  try {
    const { password, dni, vehiculo } = req.body;
    const {fecha,hora}= funDate();
    const resp = await Usuario.findOne({
      where: {
        dni
      },
      include:{
        model:Cargo,
        as:'cargousuario'
      }
    });
    if (!resp) {
      return res.json({
        ok: false,
        msg: "Usuario no registrado, converse con el administrador",
        user: null,
        token: null,
      });
    }
    if (!resp.estado) {
      return res.json({
        ok: false,
        msg: "Usuario bloqueado, converse con el administrador",
        user: null,
        token: null,
      });
    }
    if (resp.disponible===1) {
      return res.json({
        ok: false,
        msg: "Usted ya inicio sesion en otro dispositivo",
        user: null,
        token: null,
      });
    }
    if (resp.cargousuario.cargo==='UA' && resp.cargousuario.cargo==='UO') {
      return res.json({
        ok: false,
        msg: "Usted no es un usuario serenazgo",
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
    const vehi = await Vehiculo.update({
      estado:0
    },{
      where:{
        nombre:vehiculo
      }
    })
    token = await generarJWTUsuarioDos(resp.id, vehiculo);
    res.json({
        ok: true,
        msg: "Login correcto",
        usuario:resp,
        token,
        vehiculo
      });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const logoutUsuarioSerenazgo = async (req = request, res = response)=>{
  try {
    const {id} = req.usuarioToken;
    const vehiculo = req.vehiculoToken;
    const usuario = await Usuario.update({
      disponible:0
    },{
      where:{
        id
      }
    });
    const vehi = await Vehiculo.update({
      estado:1
    },{
      where:{
        nombre:vehiculo
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
    const vehiculo = req.vehiculoToken;
    const vehi = await Vehiculo.update({
      estado:0
    },{
      where:{
        nombre:vehiculo
      }
    })
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
  logoutUsuarioSerenazgo,
  validarTokenUsuario,
  authUsuarioSerenazgo
};
