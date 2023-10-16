const { request, response } = require("express")
const { Vehiculo } = require("../models")


const mostrarVehiculos=async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const vehiculo = await Vehiculo.findAll({
            where:{
                estado
            }
        })
        res.json({
            ok:true,
            msg:'Se muestran los vehiculos',
            vehiculo
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })
    }
}
const mostrarVehiculoID=async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const vehiculo = await Vehiculo.findOne({
            where:{
                id
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra el vehiculo con exito',
            vehiculo
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })
    }
}
const postVehiculo=async(req=request,res=response)=>{
    try {
        const data = req.body;
        const vehiculo = await Vehiculo.create(data);

        res.json({
            ok:true,
            msg:'Se guardo el vehiculo con exito',
            vehiculo
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })
    }
}
const putVehiculo=async(req=request,res=response)=>{
    try {
        const data = req.body;
        const {id} = req.params;
        const vehiculo = await Vehiculo.update(data,{
            where:{
                id
            }
        });
        res.json({
            ok:true,
            msg:'Se actualizo el vehiculo con exito',
            vehiculo
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })
    }
}
const deleteVehiculo=async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const  vehiculo = await Vehiculo.destroy({
            where:{
                id
            }
        })
        res.json({
            ok:true,
            msg:'Se elimino el vehiculo con exito',
            vehiculo
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })
    }
}


module.exports={
    mostrarVehiculos,
    mostrarVehiculoID,
    postVehiculo,
    putVehiculo,
    deleteVehiculo
}