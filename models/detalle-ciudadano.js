const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class DetalleCiudadano extends Model{};

DetalleCiudadano.init({
    correo:{
        type:DataTypes.STRING
    },
    perfil:{
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