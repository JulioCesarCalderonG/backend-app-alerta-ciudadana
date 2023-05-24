const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class AlertaGenerada extends Model{};

AlertaGenerada.init({
    id_alerta:{
        type:DataTypes.INTEGER
    },
    descripcion:{
        type:DataTypes.TEXT
    },
    id_tipo_alerta:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    },
    mes:{
        type:DataTypes.CHAR 
    }
},{
    timestamps:false,
    sequelize,
    tableName:"alerta_generada"
});



module.exports = AlertaGenerada