const { request, response } = require("express");
const {
    subirArchivo,
    addHoursToDate,
    fechaAntes,
    funDate,
  } = require('../helpers');
const sequelize = require('../database/database');
const { Op } = require('sequelize');
const ExcelJS = require('exceljs');
const path = require("path");
const fs = require("fs");
const reporteFiltroAlertaGenerada=async(req=request,res=response)=>{
    try {
        const { tipo } = req.query;
        const { fechaUno, fechaDos, tipoAlerta } = req.body;
        const fechaAnter = addHoursToDate(new Date(), 24);
        const { fecha } = funDate();
        let consulta = '';
        switch (tipo) {
          case '1':
            consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, C.nombre, C.apellido
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                      order by R.fecha, R.hora desc
                      `;
            break;
          case '2':
            consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, C.nombre, C.apellido
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                      where R.fecha>='${fechaUno}' AND R.fecha<='${fechaDos}' order by R.fecha, R.hora desc
                      `;
            break;
          case '3':
            consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, C.nombre, C.apellido
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                      where R.id_tipo_alerta='${tipoAlerta}  order by R.fecha, R.hora desc'
                      `;
            break;
          case '4':
            consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, C.nombre, C.apellido
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id inner join ciudadano C on A.ciudadano = C.id 
                      where R.fecha>='${fechaAnter}' AND R.fecha<='${fecha}' order by R.fecha, R.hora desc
                      `;
            break;
          default:
            consulta = 'select* from alerta_generada';
            break;
        }
        const [results, metadata] = await sequelize.query(consulta);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte');

        worksheet.columns=[
          {header:'Id',key:'id',width:10},
          {header:'Descripcion',key:'descripcion',width:20},
          {header:'Fecha',key:'fecha',width:20},
          {header:'Hora',key:'hora',width:20},
          {header:'Lat',key:'lat',width:20},
          {header:'Lng',key:'lng',width:20},
          {header:'Tipo alerta',key:'tipo_alerta',width:20},
          {header:'Nombre',key:'nombre',width:20},
          {header:'Apellido',key:'apellido',width:20},
        ];

        worksheet.addRows(results);
        const pathExcel = path.join(__dirname, "../uploads","reportes","reporte.xlsx");
        const resp = await workbook.xlsx.writeFile(pathExcel);
        console.log('se creo el excel');
        res.json({
          ok: true,
          msg: 'Se creo el excel',
          resp
        });
      } catch (error) {
        res.status(400).json({
          ok: false,
          msg: `Error: ${error}`,
        });
      }
}
const mostrarReporte =(req=request, res=response)=>{
  try {
      const pathImagenDefault = path.join(__dirname,"../uploads","reportes","reporte.xlsx");
      return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}

module.exports = {
    reporteFiltroAlertaGenerada,
    mostrarReporte
}