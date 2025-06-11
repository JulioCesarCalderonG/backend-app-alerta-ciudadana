const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


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
    usuario:{
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

/* Foreign key alerta */
/* Ciudadano.hasMany(Alerta,{
    as:'ciudadanoAlerta',
    foreignKey:'ciudadano'
});
Alerta.belongsTo(Ciudadano,{
    foreignKey:'ciudadano',
    sourceKey:'id'
});
 */

module.exports = Ciudadano;