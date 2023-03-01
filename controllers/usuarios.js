const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { Usuario, Cargo } = require("../models");

const getUsuarios = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const usuario = await Usuario.findAll({
      where:{
        estado
      },
      include:[
        {
          model:Cargo
        }
      ]
    });
    res.json({
      ok: true,
      msg:'Se muestran los usuarios con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const getSerenazgo = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const usuario = await Usuario.findAll({
      where:{
        estado:1,
        disponible:1
      },
      include:[
        {
          model:Cargo
        }
      ]
    });
    res.json({
      ok: true,
      msg:'Se muestran los usuarios con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const getUsuario = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const usuario = await Usuario.findOne({
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg:'usuario mostrado con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const postUsuario = async (req = request, res = response) => {
  try {
    const {password,...data} = req.body;
    // Validamos el password
    if (password.length <= 6) {
      return res.json({
        ok: false,
        msg: "La contraseña debe ser mayor a 6 caracteres",
      });
    }
    // Creamos un password Hasheado
    const salt = bcryptjs.genSaltSync();
    const hasPassword = bcryptjs.hashSync(password, salt);
    data.password = hasPassword;
    const usuario = await Usuario.create(data);

    res.json({
      ok: true,
      msg:'Se registro el usuario con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const putUsuario = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    
    const {password,...data} = req.body;
    const resp = await Usuario.findOne({
      where:{
        id
      }
    });
    if (!resp) {
      return res.status(400).json({
        ok:false,
        msg:'No existe usuario con ese id'
      });
    }
    if(password){
      if (password.length <=6) {
        return res.json({
          ok:false,
          msg: "La contraseña debe ser mayor a 6 caracteres",
        })
      }
      const salt = bcryptjs.genSaltSync();
      const hasPassword = bcryptjs.hashSync(password, salt);
      data.password = hasPassword;
    }
    
    const usuario = await Usuario.update(data,{
      where:{
        id
      }
    });
    res.json({
      ok: true,
      msg:'Usuario actualizado con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const deleteUsuario = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} =req.query;
    const usuario = await Usuario.update({
      estado
    },{
      where:{
        id
      }
    });
    res.json({
      ok: true,
      msg:(estado==='0')?'usuario bloqueado con exito':'usuario desbloqueado con exito',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  getSerenazgo,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
