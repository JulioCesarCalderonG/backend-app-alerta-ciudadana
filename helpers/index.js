const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcLetra = require("./fc-letra");
const enviarWelcome =require("./generar-email");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcLetra,
  ...enviarWelcome
};
