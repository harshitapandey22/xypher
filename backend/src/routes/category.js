const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/',    auth, ctrl.createCategory);
router.get('/',     auth, ctrl.getCategories);

module.exports = router;
