const { request, response } = require("express");
const { ControlPersonal, Usuario, Cargo } = require("../models");


const mostrarControlPersonal =async(req=request,res=response)=>{
    try {
        const resp = await ControlPersonal.findAll({
            include:[
                {
                    model:Usuario,
                    include:[
                        {
                            model:Cargo
                        }
                    ]
                }
            ]
        })
        res.json({
            ok:true,
            msg:'Se muestra el control de personal con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }

}


module.exports = {
    mostrarControlPersonal
}