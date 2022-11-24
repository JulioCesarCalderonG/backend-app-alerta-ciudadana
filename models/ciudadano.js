const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Alerta = require("./alerta");
const DetalleCiudadano = require("./detalle-ciudadano");


class Ciudadano extends Model{}


Ciudadano.init({
    dni:{
        type:DataTypes.CHAR,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'ciudadano',
    timestamps:false
});

/* Foreign key detalle ciudadano */
Ciudadano.hasOne(DetalleCiudadano,{
    as:'detalleciudadano',
    foreignKey:'id_ciudadano'
});
DetalleCiudadano.belongsTo(Ciudadano,{
    foreignKey:'id_ciudadano',
    sourceKey:'id'
});

/* Foreign key alerta */
Ciudadano.hasMany(Alerta,{
    as:'ciudadanoAlerta',
    foreignKey:'ciudadano'
});
Alerta.belongsTo(Ciudadano,{
    foreignKey:'ciudadano',
    sourceKey:'id'
});


module.exports = Ciudadano;