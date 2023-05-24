const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaGenerada = require("./alerta-generada");

class TipoAlerta extends Model{};

TipoAlerta.init({
    nombre:{
        type:DataTypes.STRING
    },
    opcion_foto:{
        type:DataTypes.INTEGER
    },
    icono:{
        type:DataTypes.STRING
    },
    img:{
        type:DataTypes.STRING
    },
    color:{
        type:DataTypes.CHAR
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

TipoAlerta.hasMany(AlertaGenerada,{
    as:'FK_AlertaDerivadaAlertas',
    foreignKey:'id_tipo_alerta'
});

AlertaGenerada.belongsTo(TipoAlerta,{
    foreignKey:'id_tipo_alerta',
    sourceKey:'id'
})

/* TipoAlerta.hasMany(Alerta,{
    as:'alertaTipoAlerta',
    foreignKey:'tipo_alerta'
});

Alerta.belongsTo(TipoAlerta,{
    foreignKey:'tipo_alerta',
    sourceKey:'id'
})
 */


module.exports = TipoAlerta

