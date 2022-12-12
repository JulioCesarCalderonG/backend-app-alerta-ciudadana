const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class CentroAtencion extends Model{};

CentroAtencion.init({
    lat:{
        type:DataTypes.FLOAT
    },
    lng:{
        type:DataTypes.FLOAT
    },
    descripcion:{
        type:DataTypes.STRING
    },
    celular:{
        type:DataTypes.CHAR
    },
    telefono:{
        type:DataTypes.CHAR
    },
    id_tipo_atencion:{
        type:DataTypes.INTEGER
    },
    id_usuario:{
        type:DataTypes.INTEGER
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