const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class AlertaDerivada extends Model{};


AlertaDerivada.init({
    id_alerta:{
        type:DataTypes.INTEGER
    },
    id_usuario:{
        type:DataTypes.INTEGER
    },
    atencion:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'alerta_derivada',
    timestamps:false,
});


module.exports = AlertaDerivada;