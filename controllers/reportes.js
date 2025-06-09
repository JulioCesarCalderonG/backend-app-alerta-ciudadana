const { request, response } = require("express");
const {
  subirArchivo,
  addHoursToDate,
  fechaAntes,
  funDate,
} = require("../helpers");
const sequelize = require("../database/database");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
//Generar Pdf
const PdfPrinter = require("pdfmake");

const {
  Ciudadano,
  DetalleCiudadano,
  ControlPersonal,
  Usuario,
  Cargo,
  AlertaDerivada,
  Alerta,
} = require("../models");

const reporteFiltroAlertaGenerada = async (req = request, res = response) => {
  try {
    const { tipo } = req.query;
    const { fechaUno, fechaDos, tipoAlerta } = req.body;
    const fechaAnter = addHoursToDate(new Date(), 24);
    const { fecha } = funDate();
    let consulta = "";
    switch (tipo) {
      case "1":
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      order by R.fecha, R.hora desc
                      `;
        break;
      case "2":
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      where R.fecha>='${fechaUno}' AND R.fecha<='${fechaDos}' order by R.fecha, R.hora desc
                      `;
        break;
      case "3":
        consulta = `
                     select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id
                      where R.id_tipo_alerta='${tipoAlerta}  order by R.fecha, R.hora desc'
                      `;
        break;
      case "4":
        consulta = `
                      select R.id, R.descripcion, R.fecha, R.hora, A.lat,A.lng, T.nombre as tipo_alerta, A.ciudadano
                      from alerta_generada R inner join alertas A on R.id_alerta = A.id inner join tipo_alertas T on R.id_tipo_alerta= T.id 
                      where R.fecha>='${fechaAnter}' AND R.fecha<='${fecha}' order by R.fecha, R.hora desc
                      `;
        break;
      default:
        consulta = "select* from alerta_generada";
        break;
    }
    const [results, metadata] = await sequelize.query(consulta);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte");

    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Descripcion", key: "descripcion", width: 20 },
      { header: "Fecha", key: "fecha", width: 20 },
      { header: "Hora", key: "hora", width: 20 },
      { header: "Lat", key: "lat", width: 20 },
      { header: "Lng", key: "lng", width: 20 },
      { header: "Tipo alerta", key: "tipo_alerta", width: 20 },
      { header: "Ciudadano", key: "ciudadano", width: 20 },
    ];

    worksheet.addRows(results);
    const pathExcel = path.join(
      __dirname,
      "../uploads",
      "reportes",
      "reporte.xlsx"
    );
    const resp = await workbook.xlsx.writeFile(pathExcel);
    console.log("se creo el excel");
    res.json({
      ok: true,
      msg: "Se creo el excel",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarReporte = (req = request, res = response) => {
  try {
    const pathImagenDefault = path.join(
      __dirname,
      "../uploads",
      "reportes",
      "reporte.xlsx"
    );
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

const reporteCiudadano = async (req = request, res = response) => {
  try {
    //TRAEMOS LA DATA
    const data = await Ciudadano.findAll({
      include: [
        {
          model: DetalleCiudadano,
          as: "detalleciudadano",
          required: false,
        },
      ],
    });
    const fonts = {
      Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Bold.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-BoldItalic.ttf",
      },
    };
    const tablaBody = [
      ["DNI", "Nombre", "Usuario"], // Encabezados
      ...data.map((item) => [item.dni, item.nombre, item.usuario]), // Filas dinámicas
    ];
    // 4. Definición del documento
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { text: "Reporte de Usuarios", style: "header" },
        {
          text: `Total de Ciudadanos: ${data.length}`,
          margin: [0, 0, 0, 10],
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: tablaBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=reporte.pdf");

    pdfDoc.pipe(res); // Enviar directamente al navegador
    pdfDoc.end();
    /*   res.json({
       ok:true,
       ciudadano:data
      }) */
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const reporteAlertaDerivada = async (req = request, res = response) => {
  try {
    const data = await AlertaDerivada.findAll({
      include: [
        {
          model: Alerta,
          as: "derivadaalerta",
        },
        {
          model: Usuario,
          as: "derivadausuario",
        },
      ],
    });
    const fonts = {
      Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Bold.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-BoldItalic.ttf",
      },
    };
    const tablaBody = [
      [
        "DNI Ciudadano",
        "Ciudadano",
        "año",
        "mes",
        "Lat",
        "Lng",
        "Derivado",
        "atentido",
      ], // Encabezados
      ...data.map((item) => [
        item.derivadaalerta.dni,
        item.derivadaalerta.ciudadano, 
        item.derivadaalerta.ano,
        item.derivadaalerta.mes,
        item.derivadaalerta.lat,
        item.derivadaalerta.lng,
        `${item.derivadausuario.nombre} ${item.derivadausuario.apellido}`,
        item.atencion===0?'No atendido':'Atendido'
      ]), // Filas dinámicas
    ];
    // 4. Definición del documento
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { text: "Reporte de Alerta Derivada", style: "header" },
        {
          text: `Total de Alertas Derivadas: ${data.length}`,
          margin: [0, 0, 0, 10],
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
            body: tablaBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=reporte.pdf");

    pdfDoc.pipe(res); // Enviar directamente al navegador
    pdfDoc.end();
    /* return res.json({
      ok: true,
      resp,
    }); */
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const reporteControlSistema = async (req = request, res = response) => {
  try {
    const data = await ControlPersonal.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          required: false,
          include: [
            {
              model: Cargo,
              as: "cargousuario",
              required: false,
            },
          ],
        },
      ],
    });
    const fonts = {
      Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Bold.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-BoldItalic.ttf",
      },
    };
    const tablaBody = [
      [
        "Nombre",
        "Apellido",
        "Cargo",
        "Fecha Ingreso",
        "Hora Ingreso",
        "Fecha Salida",
        "Hora Salida",
      ], // Encabezados
      ...data.map((item) => [
        item.usuario?.nombre ?? "",
        item.usuario?.apellido ?? "",
        item.usuario?.cargousuario?.descripcion ?? "",
        item.fechaingreso ?? "",
        item.horaingreso ?? "",
        item.fechasalida ?? "",
        item.horasalida ?? "",
      ]),
    ];
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { text: "Reporte de Control del sistema", style: "header" },
        {
          text: `Total de reportes: ${data.length}`,
          margin: [0, 0, 0, 10],
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*"],
            body: tablaBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=reporte.pdf");

    pdfDoc.pipe(res); // Enviar directamente al navegador
    pdfDoc.end();
    /* res.json({
      ok: true,
      data
    }); */
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};

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
  mostrarAlertaDerivadaReporte,
};
