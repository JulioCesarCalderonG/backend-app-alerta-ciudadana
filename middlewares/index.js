
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validaArchivoSubir = require('../middlewares/validar-archivo')
module.exports = {
    ...validarJWT,
    ...validaRoles,
    ...validaArchivoSubir,
    ...validarCampos,
    
}