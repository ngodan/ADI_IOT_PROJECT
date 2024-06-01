const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {authenticateToken} = require('../middlewares/auth.middleware');
// Định nghĩa các routes cho người dùng

router.post('/',authenticateToken, UserController.createUser);
router.get('/',authenticateToken, UserController.getAllUsers);
router.get('/:id',authenticateToken, UserController.getUserById);
router.put('/:id',authenticateToken, UserController.updateUser);
router.delete('/:id',authenticateToken, UserController.deleteUser);

module.exports = router;