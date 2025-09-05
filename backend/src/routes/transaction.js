const router = require('express').Router();
const ctrl = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/',    auth, ctrl.createTransaction);
router.get('/',     auth, ctrl.getTransactions);
router.delete('/:id', auth, ctrl.deleteTransaction);

module.exports = router;
