const { request, response } = require("express");
const { Ciudadano, DetalleCiudadano } = require("../models");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const getCiudadanos = async (req = request, res = response) => {
  try {
    const { estado, buscar } = req.query;
    if (buscar === "") {
      const ciudadano = await Ciudadano.findAll({
        where: {
          estado,
        },
      });
      return res.json({
        ok: true,
        msg: "Ciudadanos mostrados con exito",
        ciudadano,
      });
    }
    const ciudadano = await Ciudadano.findAll({
      where: {
        estado,
        [Op.or]: [
          {
            dni: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
          {
            nombre: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
          {
            apellido: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
          {
            usuario: {
              [Op.startsWith]: `%${buscar}%`,
            },
          }
        ],
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
    const { password, dni,celular,usuario, ...data } = req.body;

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
    //Verificamos si el ciudadano ya esta registrado con el usuario
    const resp2 = await Ciudadano.findOne({
      where:{
        usuario
      }
    });
    if (resp2) {
      return res.status(400).json({
        ok: false,
        msg: `El usuario ya esta existe, registrate con otro usuario`,
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
    data.usuario=usuario;
    // Realizamos la subida del usuario al BD
    const ciudadano = await Ciudadano.create(data);
    // Realizamos la subida a la tabla detalle ciudadano
    const detalleCiudadano = await DetalleCiudadano.create({celular,id_ciudadano:ciudadano.id});
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
    const { id } = req.params;
    const { estado } = req.query;
    const ciudadano = await Ciudadano.update(
      {
        estado,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      msg:
        estado === "0"
          ? "Se bloqueo el centro de atencion"
          : "Se desbloqueo el centro de atencion",
      ciudadano,
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

    const ciudadano = await Ciudadano.findOne({
      where: {
        id,
      },
    });
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
    const resp = await Ciudadano.update(
      { password: hasPassword },
      {
        where: {
          id: ciudadano.id,
        },
      }
    );

    res.json({
      ok: true,
      msg: "Password Actualizado",
      resp,
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
