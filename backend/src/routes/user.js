const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/userController');

router.get('/me',           auth, ctrl.getCurrentUser);
router.post('/balance-limit', auth, ctrl.setBalanceAndLimit);

module.exports = router;
