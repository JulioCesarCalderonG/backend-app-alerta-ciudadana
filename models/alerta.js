const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

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
    }
},{
    sequelize,
    tableName:'alertas',
    timestamps:false
});

module.exports = Alerta;