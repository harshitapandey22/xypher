const router = require('express').Router();
const ctrl = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.post('/',    auth, ctrl.createAccount);
router.get('/',     auth, ctrl.getAccounts);
router.get('/:id',  auth, ctrl.getAccount);
router.put('/:id',  auth, ctrl.updateAccount);
router.delete('/:id',auth, ctrl.deleteAccount);

module.exports = router;
