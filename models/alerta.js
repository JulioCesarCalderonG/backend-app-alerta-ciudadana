const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");

class Alerta extends Model{};


Alerta.init({
    lat:{
        type:DataTypes.FLOAT
    },
    lng:{
        type:DataTypes.FLOAT
    },
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    },
    ciudadano:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'alertas',
    timestamps:false
});
/* Relacion Alerta Derivada Alerta */
Alerta.hasOne(AlertaDerivada,{
    as:'FK_AlertaDerivadaAlertas',
    foreignKey:'id_alerta'
});
AlertaDerivada.belongsTo(Alerta,{
    foreignKey:'id_alerta',
    sourceKey:'id'
})


module.exports = Alerta;