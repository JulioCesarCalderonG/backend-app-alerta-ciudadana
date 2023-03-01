const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");

class Alerta extends Model{};


Alerta.init({
    descripcion:{
        type:DataTypes.TEXT
    },
    lat:{
        type:DataTypes.FLOAT
    },
    lng:{
        type:DataTypes.FLOAT
    },
    foto:{
        type:DataTypes.STRING
    },
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    },
    ciudadano:{
        type:DataTypes.INTEGER
    },
    tipo_alerta:{
        type:DataTypes.INTEGER
    },
    derivado:{
        type:DataTypes.TINYINT,
        defaultValue:0
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