const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class DetalleCiudadano extends Model{};

DetalleCiudadano.init({
    celular:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    id_ciudadano:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'detalle_ciudadano',
    timestamps:false
});




module.exports = DetalleCiudadano