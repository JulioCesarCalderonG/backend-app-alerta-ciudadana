


const getUsuarios =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const getUsuario =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const postUsuario =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const updateUsuario =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const deleteUsuario =async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    updateUsuario,
    deleteUsuario
}