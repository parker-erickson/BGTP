const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/home', authController.home);
router.get('/logout', authController.logout);
router.post('/post', authController.post);

module.exports = router;