const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcLetra = require("./fc-letra");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcLetra
};
