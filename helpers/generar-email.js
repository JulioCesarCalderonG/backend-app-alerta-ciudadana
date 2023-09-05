const transport = require('../mail/mailer');
const enviarWelcome = async (email='', token='') => {

  //const welcome = await Welcome.find();

  try {
    const envioEmail = await transport.sendMail({
      from: '"MPCP 👻" <gongalso@gongalsoft.com>', // sender address
      to: email, // list of receivers
      subject: `ALERTA CIUDADANA CALLERIA`, // Subject line
      //text: "Hello world?", // plain text body
      html: `<h4>Para cambiar su contraseña porfavor, ingrese al siguiente enlace</h4><a href="https://gongalsoft.com/resetpassword.html?token=${token}">Cambiar Contraseña</a> `// html body
    });
    if (!envioEmail) {
        return {
            ok:false,
            resp: 'Mensaje no enviado',
            envioEmail
        }
    }
    if (envioEmail) {
      return{
          ok:true,
          resp:'Mensaje enviado exitosamente',
          envioEmail
      }
    }
  } catch (error) {
    
    return {
      ok:false,
      resp: `Porfavor, verifique su conexion a internet o el correo electronico`,
      error
    }
  }
};
const enviarCodigo = async (email='', codigo='') => {

  //const welcome = await Welcome.find();

  try {
    const envioEmail = await transport.sendMail({
      from: '"MPCP 👻" <gongalso@gongalsoft.com>', // sender address
      to: email, // list of receivers
      subject: `ALERTA CIUDADANA CALLERIA`, // Subject line
      //text: "Hello world?", // plain text body
      html: `<h4>Su codigo para la eliminacion de su cuenta es : ${codigo}</h4>`// html body
    });
    if (!envioEmail) {
        return {
            ok:false,
            resp: 'Mensaje no enviado',
            envioEmail
        }
    }
    if (envioEmail) {
      return{
          ok:true,
          resp:'Mensaje enviado exitosamente',
          envioEmail
      }
    }
  } catch (error) {
    
    return {
      ok:false,
      resp: `Porfavor, verifique su conexion a internet o el correo electronico`,
      error
    }
  }
};
module.exports = {
  enviarWelcome,
  enviarCodigo
};