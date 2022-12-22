const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class CentroAtencion extends Model{};

CentroAtencion.init({
    titulo:{
        type:DataTypes.STRING
    },
    lat:{
        type:DataTypes.FLOAT
    },
    lng:{
        type:DataTypes.FLOAT
    },
    direccion:{
        type:DataTypes.STRING
    },
    celular:{
        type:DataTypes.CHAR
    },
    telefono:{
        type:DataTypes.CHAR
    },
    id_tipo_atencion:{
        type:DataTypes.STRING
    },
    id_usuario:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'centro_atencion',
    timestamps:false
});


module.exports = CentroAtencion;