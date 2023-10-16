const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Vehiculo extends Model{};

Vehiculo.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'vehiculo',
    timestamps:false
});


module.exports = Vehiculo;