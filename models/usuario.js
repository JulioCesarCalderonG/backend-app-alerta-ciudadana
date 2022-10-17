const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Usuario extends Model{}


Usuario.init({
    dni:{
        type:DataTypes.CHAR,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    correo:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'usuario',
    timestamps:false
});



module.exports = Usuario;