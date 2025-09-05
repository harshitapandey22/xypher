const router = require('express').Router();
const ctrl   = require('../controllers/authController');

router.post('/signup', ctrl.signup);
router.post('/login',  ctrl.login);
router.post('/refresh',ctrl.refresh);
router.post('/logout', ctrl.logout);

module.exports = router;
