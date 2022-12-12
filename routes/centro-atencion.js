const { Router } = require("express");
const { getCentroAtenciones, getCentroAtencion, postCentroAtencion, putCentroAtencion, deleteCentroAtencion } = require("../controllers/centro-atencion");



const router = Router();


router.get('',getCentroAtenciones);
router.get('',getCentroAtencion);
router.post('',postCentroAtencion);
router.put('',putCentroAtencion);
router.delete('',deleteCentroAtencion);





module.exports =router;