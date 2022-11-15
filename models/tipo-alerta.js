const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class TipoAlerta extends Model{};

TipoAlerta.init({
    nombre:{
        type:DataTypes.STRING
    },
    icono:{
        type:DataTypes.STRING
    },
    img:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_alertas',
    timestamps:false
});




module.exports = TipoAlerta

