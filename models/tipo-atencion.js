const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const CentroAtencion = require("./centro-atencion");

class TipoAtencion extends Model{};


TipoAtencion.init({
    nombre:{
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
    tableName:'tipo_atencion_rapida',
    timestamps:false
});

TipoAtencion.hasMany(CentroAtencion,{
    as:'TipoCentroAtencion',
    foreignKey:'id_tipo_atencion'
});

CentroAtencion.belongsTo(TipoAtencion,{
    foreignKey:'id_tipo_atencion',
    sourceKey:'id'
});


module.exports = TipoAtencion;
