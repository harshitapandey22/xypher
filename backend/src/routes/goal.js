const router = require('express').Router();
const ctrl = require('../controllers/goalController');
const auth = require('../middleware/auth');

router.post('/',    auth, ctrl.createGoal);
router.get('/',     auth, ctrl.getGoals);
router.delete('/:id', auth, ctrl.deleteGoal);
router.post('/distribute', auth, ctrl.autoDistributeSavings);
router.put('/reorder', auth, ctrl.reorderGoals);
router.post('/reset-distribute', auth, ctrl.resetAndDistribute);


module.exports = router;
