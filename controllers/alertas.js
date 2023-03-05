const { request, response } = require("express");
const { subirArchivo, addHoursToDate, fechaAntes } = require("../helpers");
const { funDate } = require("../helpers");
const { Alerta, Ciudadano, TipoAlerta } = require("../models");
const sequelize = require("../database/database");
const { Op } = require("sequelize");
const getAlertas = async (req = request, res = response) => {
  try {
    const data = req.body;
    const alerta = await Alerta.findAll({
      include: [
        {
          model: Ciudadano,
        },
        {
          model: TipoAlerta,
        },
      ],
    });
    res.json({
      data,
      ok: true,
      msg: `Se muestra todos las alertas cudadanas`,
      alerta,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getFiltroAlertas = async (req = request, res = response) => {
  try {
    const { buscar } = req.query;
    const { fecha,hora } = funDate();
    const fechaAnterior = addHoursToDate(new Date(), 24);
    if (buscar === '') {
        const alerta = await Alerta.findAll({
            where: {
              [Op.or]: [
                { fecha: fechaAnterior },
                { fecha: fecha }
              ]
            },
            include:[
                {
                    model:TipoAlerta
                },
                {
                    model:Ciudadano
                }
            ]
          });
          return res.json({
            ok: true,
            msg: "Se han mostrado las alertas con exito",
            alerta
          });
    }
    const alerta = await Alerta.findAll({
        where: {
          [Op.or]: [
            { fecha: fechaAnterior },
            { fecha: fecha }
          ]
        },
        include: [
          {
            model: TipoAlerta,
            where: {
              [Op.or]: [
                {
                  nombre: {
                    [Op.startsWith]: `%${buscar}%`,
                  },
                },
              ],
            },
          },
          {
            model:Ciudadano
          }
        ],
      });
    return  res.json({
      ok: true,
      msg: "Se han mostrado las alertas con exito",
      alerta
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const filtroAlerta = async (req = request, res = response) => {
  try {
    const { tipo } = req.query;
    const { fechaUno, fechaDos, tipoAlerta } = req.body;
    const fechaAnter = addHoursToDate(new Date(), 24);
    const { fecha } = funDate();
    let consulta = "";
    switch (tipo) {
      case "1":
        consulta = `
                select A.id, A.descripcion, A.foto, A.lat,A.lng,A.foto,A.fecha,A.hora, A.derivado, C.dni, C.nombre, C.apellido, T.id as 'id_tipo', T.nombre as 'nombre_tipo', T.color
                from alertas A inner join ciudadano C on A.ciudadano = C.id inner join tipo_alertas T on A.tipo_alerta = T.id  order by fecha desc
                `;
        break;
      case "2":
        consulta = `
                select A.id, A.descripcion, A.foto, A.lat,A.lng,A.foto,A.fecha,A.hora, A.derivado, C.dni, C.nombre, C.apellido, T.id as 'id_tipo', T.nombre as 'nombre_tipo', T.color
                from alertas A inner join ciudadano C on A.ciudadano = C.id inner join tipo_alertas T on A.tipo_alerta = T.id where fecha>='${fechaUno}' AND fecha<='${fechaDos}' order by fecha desc
                `;
        break;
      case "3":
        consulta = `
                select A.id, A.descripcion, A.foto, A.lat,A.lng,A.foto,A.fecha,A.hora, A.derivado, C.dni, C.nombre, C.apellido, T.id as 'id_tipo', T.nombre as 'nombre_tipo', T.color
                from alertas A inner join ciudadano C on A.ciudadano = C.id inner join tipo_alertas T on A.tipo_alerta = T.id where tipo_alerta='${tipoAlerta}  order by fecha desc'
                `;
        break;
      case "4":
        consulta = `
                select A.id, A.descripcion, A.foto, A.lat,A.lng,A.foto,A.fecha,A.hora, A.derivado, C.dni, C.nombre, C.apellido, T.id as 'id_tipo', T.nombre as 'nombre_tipo', T.color
                from alertas A inner join ciudadano C on A.ciudadano = C.id inner join tipo_alertas T on A.tipo_alerta = T.id where fecha>='${fechaAnter}' AND fecha<='${fecha}' order by fecha desc
                `;
        break;
      default:
        consulta = "select* from alertas";
        break;
    }
    const [results, metadata] = await sequelize.query(consulta);
    res.json({
      ok: true,
      msg: "Se muestran las alertas con exito",
      results,
      fechaAnter
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getAlerta = async (req = request, res = response) => {
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
const getAlertaCiudadano = async (req = request, res = response) => {
  try {
    const { id, nombre, apellido } = req.ciudadanoToken;
    const alerta = await Alerta.findAll({
      where: {
        ciudadano: id,
      },
      include: [
        {
          model: TipoAlerta,
        },
      ],
    });
    res.json({
      ok: true,
      resp: `Se muestra las alertas del ciudadano: ${nombre} ${apellido}`,
      alerta,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const postAlerta = async (req = request, res = response) => {
  try {
    const { ...data } = req.body;
    const { hora, fecha } = funDate();
    const ciudadano = req.ciudadanoToken;
    if (req.files) {
      const file = req.files;
      const foto = await subirArchivo(file, undefined, "alertas");
      data.foto = foto;
    }
    data.fecha = fecha;
    data.hora = hora;
    data.ciudadano = ciudadano.id;
    const alerta = await Alerta.create(data);
    res.json({
      ok: true,
      msg: `Se envio la alerta ciudadana, la patrulla esta en camino`,
      alerta,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const putAlerta = async (req = request, res = response) => {
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
const deleteAlerta = async (req = request, res = response) => {
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

module.exports = {
  getAlertas,
  getAlerta,
  getFiltroAlertas,
  getAlertaCiudadano,
  filtroAlerta,
  postAlerta,
  putAlerta,
  deleteAlerta,
};
