const { request, response } = require('express');
const { funDate } = require('../helpers');
const { Alerta, AlertaGenerada } = require('../models');

const graficaAlerta = async (req = request, res = response) => {
  try {
    const { ano } = funDate();
    const meses = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    let valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i in meses) {
      console.log(meses[i]);
      const resp = await Alerta.count({
        where: {
          ano,
          mes: meses[i],
        },
      });
      valores[i] += resp;
    }

    const data = { data: valores, label: 'Boton de Panico' };

    res.json([data]);
  } catch (error) {}
};
const graficaAlertaGenerada = async (req = request, res = response) => {
  try {
    const { ano } = funDate();
    const meses = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    let valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i in meses) {
      console.log(meses[i]);
      const resp = await AlertaGenerada.count({
        where: {
          ano,
          mes: meses[i],
        },
      });
      valores[i] += resp;
    }

    const data = { data: valores, label: 'Alerta Registradas' };

    res.json([data]);
  } catch (error) {}
};

const alertaTotal = async (req = request, res = response) => {
  try {
    const count = await Alerta.count();
    const data = {data:[count],label:'Total Boton de Panico'}
    res.json([data])
  } catch (error) {}
};
const alertaTotalGeneral = async (req = request, res = response) => {
    try {
      const count = await AlertaGenerada.count();
      const data = {data:[count],label:'Total de Alertas Registradas'}
      res.json([data])
    } catch (error) {}
  };
module.exports = {
  graficaAlerta,
  graficaAlertaGenerada,
  alertaTotal,
  alertaTotalGeneral
};
