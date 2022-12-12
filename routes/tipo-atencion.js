const { Router } = require("express");
const { getTipoAtenciones, getTipoAtencion, postTipoAtencion, putTipoAtencion, deleteTipoAtencion } = require("../controllers/tipo-atencion");



const router = Router();


router.get('',getTipoAtenciones);
router.get('',getTipoAtencion);
router.post('',postTipoAtencion);
router.put('',putTipoAtencion);
router.delete('',deleteTipoAtencion);





module.exports =router;