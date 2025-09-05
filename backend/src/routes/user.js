const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/userController');

// --- ADD THESE DEBUGGING LINES ---
console.log('Is auth a function?', typeof auth);
console.log('Is ctrl.getCurrentUser a function?', typeof ctrl.getCurrentUser);
// ---------------------------------

router.get('/me', auth, ctrl.getCurrentUser); // This is the line that fails
router.post('/balance-limit', auth, ctrl.setBalanceAndLimit);

module.exports = router;