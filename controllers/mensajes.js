const { request, response } = require("express");
const { enviarWelcome, generarJWT } = require("../helpers");
const { DetalleCiudadano } = require("../models");

const enviarMensaje = async (req = request, res = response) => {
  try {
    const { correo } = req.body;
    const detaCiudadano = await DetalleCiudadano.findOne({
      where: {
        correo,
      },
    });
    //const resp = await enviarWelcome(correo);
    const token = await generarJWT(detaCiudadano.id_ciudadano);
    const resp = await enviarWelcome(correo, token);
    res.json({
      ok: true,
      msg: `Se envio un mensaje al correo: ${correo}`,
      resp
    });
  } catch (error) {
    res.status(400).json({
        ok:false,
        msg:`${error}`
    })
  }
};

module.exports = {
  enviarMensaje,
};
