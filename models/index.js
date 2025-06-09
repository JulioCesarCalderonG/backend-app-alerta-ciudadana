
const Server = require("./server");
const Ciudadano = require("./ciudadano");
const DetalleCiudadano = require("./detalle-ciudadano");
const Cargo = require('./cargo');
const TipoAlerta = require("./tipo-alerta");
const OpcionFoto= require("./opcion-foto");
const Alerta = require("./alerta");
const Usuario = require("./usuario");
const TipoAtencion= require("./tipo-atencion");
const CentroAtencion = require("./centro-atencion");
const AlertaDerivada = require("./alerta-derivada");
const AlertaGenerada = require("./alerta-generada");
const ControlPersonal = require("./control-personal");
const Vehiculo = require("./vehiculo");


/* Foreign key detalle ciudadano */
Ciudadano.hasOne(DetalleCiudadano,{
    as:'detalleciudadano',
    foreignKey:'id_ciudadano'
});

DetalleCiudadano.belongsTo(Ciudadano,{
    foreignKey:'id_ciudadano',
    as:'ciudadano'
});
/* Foreign key control personal  */
Usuario.hasMany(ControlPersonal,{
    as:'controlpersonal',
    foreignKey:'id_usuario'
});

ControlPersonal.belongsTo(Usuario,{
    foreignKey:'id_usuario',
    as:"usuario"
})

/* Foreign key cargo  */
Cargo.hasOne(Usuario,{
    as:'usuariocargo',
    foreignKey:'id_cargo'
});
Usuario.belongsTo(Cargo,{
    foreignKey:'id_cargo',
    as:'cargousuario'
})

/* Relacion Alerta Derivada Alerta */
Alerta.hasOne(AlertaDerivada,{
    as:'alertaderivada',
    foreignKey:'id_alerta'
});
AlertaDerivada.belongsTo(Alerta,{
    foreignKey:'id_alerta',
    as:'derivadaalerta'
});
/* Foreign alerta Derivada  */

Usuario.hasMany(AlertaDerivada,{
    as:'usuarioderivada',
    foreignKey:'id_usuario'
});

AlertaDerivada.belongsTo(Usuario,{
    foreignKey:'id_usuario',
    as:'derivadausuario'
});


module.exports = {
  Server,
  Ciudadano,
  DetalleCiudadano,
  Cargo,
  TipoAlerta,
  OpcionFoto,
  Alerta,
  Usuario,
  TipoAtencion,
  CentroAtencion,
  AlertaDerivada,
  AlertaGenerada,
  ControlPersonal,
  Vehiculo
};
