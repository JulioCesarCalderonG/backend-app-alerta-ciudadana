const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const TipoAlerta = require("./tipo-alerta");

class OpcionFoto extends Model{};

OpcionFoto.init({
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'opcion_foto',
    timestamps:false
});


OpcionFoto.hasMany(TipoAlerta, {
    as:'opcionfotoalerta',
    foreignKey:'opcion_foto'
});

TipoAlerta.belongsTo(OpcionFoto,{
    foreignKey: 'opcion_foto',
    sourceKey:'id'
})



module.exports = OpcionFoto;





