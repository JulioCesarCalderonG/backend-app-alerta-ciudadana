const { Router } = require("express");
const { getCargos, getCargo, postCargo, updateCargo, deleteCargo } = require("../controllers/cargos");



const router = Router();

router.get('/',getCargos);
router.get('/:id',getCargo);
router.post('/',postCargo);
router.put('/:id',updateCargo);
router.delete('/:id',deleteCargo);






module.exports = router;