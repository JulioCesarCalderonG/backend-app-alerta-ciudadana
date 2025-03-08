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
const pdf = require("pdf-creator-node");
const { Ciudadano, DetalleCiudadano, ControlPersonal, Usuario, Cargo, AlertaDerivada, Alerta } = require("../models");


const reporteFiltroAlertaGenerada = async (req = request, res = response) => {
  try {
    const { tipo } = req.query;
    const { fechaUno, fechaDos, tipoAlerta } = req.body;
    const fechaAnter = addHoursToDate(new Date(), 24);
    const { fecha } = funDate();
    let consulta = '';
    switch (tipo) {
      case '1':
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      order by R.fecha, R.hora desc
                      `;
        break;
      case '2':
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      where R.fecha>='${fechaUno}' AND R.fecha<='${fechaDos}' order by R.fecha, R.hora desc
                      `;
        break;
      case '3':
        consulta = `
                     select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      where R.id_tipo_alerta='${tipoAlerta}  order by R.fecha, R.hora desc'
                      `;
        break;
      case '4':
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id 
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

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Descripcion', key: 'descripcion', width: 20 },
      { header: 'Fecha', key: 'fecha', width: 20 },
      { header: 'Hora', key: 'hora', width: 20 },
      { header: 'Lat', key: 'lat', width: 20 },
      { header: 'Lng', key: 'lng', width: 20 },
      { header: 'Tipo alerta', key: 'tipo_alerta', width: 20 },
      { header: 'Ciudadano', key: 'ciudadano', width: 20 },
    ];

    worksheet.addRows(results);
    const pathExcel = path.join(__dirname, "../uploads", "reportes", "reporte.xlsx");
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
const mostrarReporte = (req = request, res = response) => {
  try {
    const pathImagenDefault = path.join(__dirname, "../uploads", "reportes", "reporte.xlsx");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}

const reporteCiudadano = async (req = request, res = response) => {
  try {
    let array = [];
    let data = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
      "timeout": 60000
    };
    const resp = await Ciudadano.findAll();
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/ciudadano.html"),
      "utf-8"
    );
    const filename = "ciudadano" + "_doc" + ".pdf";
    
    if (resp.length === 0) {
      const prod = {
        id: "",
        dni: "",
        nombre: "",
        celular: "",
        correo: "",
        estado: ""
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const detalle = await DetalleCiudadano.findOne({
          where: {
            id_ciudadano: resp[i].id
          }
        })
        const prod = {
          id: `${i + 1}`,
          dni: resp[i].dni,
          nombre: resp[i].nombre,
          celular: detalle.celular,
          correo: detalle.correo,
          estado: resp[i].estado == 1 ? 'Activo' : 'Inactivo'
        };
        array.push(prod);

      }
    }
    const obj = {
      prodlist: array
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/pdf/" + filename,
    };
    /* Probando codigo */
   const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];
    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename
    }); 
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}
const reporteAlertaDerivada = async(req = request, res = response) => {
  try {
    let array = [];
    let data = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
      "timeout": 60000
    };
    
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/alertaderivada.html"),
      "utf-8"
    );
    const filename = "alertaderivada" + "_doc" + ".pdf";

    const resp = await AlertaDerivada.findAll({
      include:[
        {
          model:Alerta,
        },
        {
          model:Usuario
        }
      ]
    });
    if (resp.length === 0) {
      const prod = {
        id: "",
        ciudadano:"",
        dni:"",
        lat: "",
        lng: "",
        ano:"",
        mes:"",
        serenazgo:"",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          ciudadano: resp[i].Alertum.ciudadano,
          dni: resp[i].Alertum.dni,
          lat:resp[i].Alertum.lat,
          lng: resp[i].Alertum.lng,
          ano: resp[i].Alertum.ano,
          mes: resp[i].Alertum.mes,
          serenazgo:`${resp[i].Usuario.nombre} ${resp[i].Usuario.apellido}`
        };
        array.push(prod);

      }
    }
    const obj = {
      prodlist: array
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/pdf/" + filename,
    };
    /* Probando codigo */
   const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];
    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename
    }); 
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}
const reporteControlSistema = async(req = request, res = response) => {
  try {
    let array = [];
    let data = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
      "timeout": 60000
    };
    
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/control.html"),
      "utf-8"
    );
    const filename = "control" + "_doc" + ".pdf";

    const resp = await ControlPersonal.findAll({
      include:[
        {
          model:Usuario,
        }
      ]
    });
    if (resp.length === 0) {
      const prod = {
        id: "",
        usuario: "",
        fechaingreso: "",
        horaingreso: "",
        fechasalida: "",
        horasalida: ""
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          usuario: `${resp[i].Usuario.nombre} ${resp[i].Usuario.apellido}`,
          fechaingreso: resp[i].fechaingreso,
          horaingreso: resp[i].horaingreso,
          fechasalida: resp[i].fechasalida,
          horasalida: resp[i].horasalida
        };
        array.push(prod);

      }
    }
    const obj = {
      prodlist: array
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/pdf/" + filename,
    };
    /* Probando codigo */
   const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];
    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename
    }); 
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
}

const mostrarCiudadanoReporte = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "pdf", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarControlReporte = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "pdf", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarAlertaDerivadaReporte = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "pdf", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};


module.exports = {
  reporteFiltroAlertaGenerada,
  mostrarReporte,
  reporteCiudadano,
  reporteAlertaDerivada,
  reporteControlSistema,
  mostrarCiudadanoReporte,
  mostrarControlReporte,
  mostrarAlertaDerivadaReporte
}