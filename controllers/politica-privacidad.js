const { request, response } = require("express");
const path = require("path");
const fs = require("fs");


const politicaPrivacidad = (req=request,res=response)=>{
    const pathImagen = path.join(
        __dirname,
        "../assets",
        "politicasdeprivacidad.pdf",
      );
      return res.sendFile(pathImagen);
}


module.exports ={ 
    politicaPrivacidad
}