const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Usuario = require("./usuario");

class Cargo extends Model{};


Cargo.init({
    cargo:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'cargo',
    timestamps:false
});

Cargo.hasOne(Usuario,{
    as:'CargoUsuario',
    foreignKey:'id_cargo'
});
Usuario.belongsTo(Cargo,{
    foreignKey:'id_cargo',
    sourceKey:'id'
})




module.exports = Cargo;