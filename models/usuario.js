const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");
const CentroAtencion = require("./centro-atencion");
const ControlPersonal = require("./control-personal");

class Usuario extends Model{};


Usuario.init({
    dni:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    password:{
        type:DataTypes.STRING
    },
    id_cargo:{
        type:DataTypes.INTEGER
    },
    disponible:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    tableName:'usuario',
    timestamps:false
});


Usuario.hasMany(CentroAtencion,{
    as:'UsuarioCentroAtencion',
    foreignKey:'id_usuario'
});

CentroAtencion.belongsTo(Usuario,{
    foreignKey:'id_usuario',
    sourceKey:'id'
});

Usuario.hasMany(AlertaDerivada,{
    as:'FK_AlertaDerivadaUsuario',
    foreignKey:'id_usuario'
});

AlertaDerivada.belongsTo(Usuario,{
    foreignKey:'id_usuario',
    sourceKey:'id'
});

Usuario.hasMany(ControlPersonal,{
    as:'FK_ControlPersonalPersonal',
    foreignKey:'id_usuario'
});

ControlPersonal.belongsTo(Usuario,{
    foreignKey:'id_usuario',
    sourceKey:'id'
})




module.exports = Usuario
