const express = require('express');
const router = express.Router();
const {login,logout,verifyToken} = require('../controllers/auth.controller');

// Định nghĩa các routes cho người dùng

router.post('/login', login);
// router.post('/register', AuthController.register);
router.post('/logout', logout);
router.post('/verify', verifyToken);

module.exports = router;