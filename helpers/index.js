const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcLetra = require("./fc-letra");
const enviarWelcome =require("./generar-email");
const funDate = require("./fc-fecha");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcLetra,
  ...enviarWelcome,
  ...funDate
};
