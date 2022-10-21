const { Welcome } = require("../models");
const transport = require('../mail/mailer');
const enviarWelcome = async (email='') => {

  //const welcome = await Welcome.find();

  const envioEmail = await transport.sendMail({
    from: '"Gongal Soft 👻" <gongal.soft@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `Recuperacion de contraseña`, // Subject line
    //text: "Hello world?", // plain text body
    html: `<h1>hola mundo</h1>`// html body
  });
  if (!envioEmail) {
      return {
          ok:false,
          resp: 'Mensaje no enviado'
      }
  }
  if (envioEmail) {
    return{
        ok:true,
        resp:'Mensaje enviado exitosamente'
    }
  }
};
module.exports = {
  enviarWelcome,
};