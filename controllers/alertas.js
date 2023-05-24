const { request, response } = require('express');
const { subirArchivo, addHoursToDate, fechaAntes } = require('../helpers');
const { funDate } = require('../helpers');
const {
  Alerta,
  Ciudadano,
  TipoAlerta,
  DetalleCiudadano,
} = require('../models');
const sequelize = require('../database/database');
const { Op } = require('sequelize');
const getAlertas = async (req = request, res = response) => {
  try {
    const data = req.body;
    const alerta = await Alerta.findAll({
      include: [
        {
          model: Ciudadano,
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
    const { fecha, hora } = funDate();
    const fechaAnterior = addHoursToDate(new Date(), 24);
    if (buscar === '') {
      const alerta = await Alerta.findAll({
        where: {
          [Op.or]: [{ fecha: fechaAnterior }, { fecha: fecha }],
        },
        include: [
          {
            model: Ciudadano,
          },
        ],
        order: [
          ['fecha', 'DESC'],
          ['hora', 'DESC'],
        ],
      });
      return res.json({
        ok: true,
        msg: 'Se han mostrado las alertas con exito',
        alerta,
      });
    }
    const alerta = await Alerta.findAll({
      where: {
        [Op.or]: [{ fecha: fechaAnterior }, { fecha: fecha }],
      },
      include: [
        {
          model: Ciudadano,
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
      ],
      order: [
        ['fecha', 'DESC'],
        ['hora', 'DESC'],
      ],
    });
    return res.json({
      ok: true,
      msg: 'Se han mostrado las alertas con exito',
      alerta,
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
    let consulta = '';
    switch (tipo) {
      case '1':
        consulta = `
                select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, T.img, T.color, C.nombre, C.apellido
                from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                order by R.fecha, R.hora desc
                `;
        break;
      case '2':
        consulta = `
                select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, T.img, T.color, C.nombre, C.apellido
                from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                where R.fecha>='${fechaUno}' AND R.fecha<='${fechaDos}' order by R.fecha, R.hora desc
                `;
        break;
      case '3':
        consulta = `
                select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, T.img, T.color, C.nombre, C.apellido
                from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                where R.id_tipo_alerta='${tipoAlerta}  order by R.fecha, R.hora desc'
                `;
        break;
      case '4':
        consulta = `
                select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, T.img, T.color, C.nombre, C.apellido
                from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                where fecha>='${fechaAnter}' AND fecha<='${fecha}' order by fecha desc
                `;
        break;
      default:
        consulta = 'select* from alerta_generada';
        break;
    }
    const [results, metadata] = await sequelize.query(consulta);
    res.json({
      ok: true,
      msg: 'Se muestran las alertas con exito',
      results,
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
    const { id } = req.params;
    const alerta = await Alerta.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Ciudadano,
        },
      ],
    });
    const detalle = await DetalleCiudadano.findOne({
      where: {
        id_ciudadano: alerta.ciudadano,
      },
    });
    res.json({
      ok: true,
      alerta,
      detalle,
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
    const { hora, fecha,ano,mes } = funDate();
    const ciudadano = req.ciudadanoToken;
    data.fecha = fecha;
    data.hora = hora;
    data.ciudadano = ciudadano.id;
    data.ano=ano;
    data.mes=mes;
    const alerta = await Alerta.create(data);
    res.json({
      ok: true,
      msg: `Se envio la alerta ciudadana, se contactaran con usted`,
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
