const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class ControlPersonal extends Model{};


ControlPersonal.init({
    id_usuario:{
        type:DataTypes.INTEGER
    },
    fechaingreso:{
        type:DataTypes.CHAR
    },
    horaingreso:{
        type:DataTypes.CHAR
    },
    fechasalida:{
        type:DataTypes.CHAR
    },
    horasalida:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'control_personal',
    timestamps:false
});



module.exports = ControlPersonal;