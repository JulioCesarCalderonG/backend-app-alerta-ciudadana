const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
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

Ciudadano.hasOne(DetalleCiudadano,{
    as:'detalleciudadano',
    foreignKey:'id_ciudadano'
});
DetalleCiudadano.belongsTo(Ciudadano,{
    foreignKey:'id_ciudadano',
    sourceKey:'id'
})


module.exports = Ciudadano;