const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");
const AlertaGenerada = require("./alerta-generada");

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
        type:DataTypes.STRING
    },
    registrado:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    ano:{
        type:DataTypes.CHAR
    },
    mes:{
        type:DataTypes.CHAR 
    },
    dni:{
        type:DataTypes.CHAR
    },
    celular:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
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
});

/* Relacion Alerta Generada Alerta */
Alerta.hasOne(AlertaGenerada,{
    as:'FK_AlertaGeneradaTipoAlerta',
    foreignKey:'id_alerta'
});
AlertaGenerada.belongsTo(Alerta,{
    foreignKey:'id_alerta',
    sourceKey:'id'
})


module.exports = Alerta;