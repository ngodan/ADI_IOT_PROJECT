const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role.controller');
const {authenticateToken} = require('../middlewares/auth.middleware');
// Định nghĩa các routes cho người dùng

router.post('/',authenticateToken, RoleController.createRole);
router.get('/',authenticateToken, RoleController.getAllRoles);
router.get('/:id',authenticateToken, RoleController.getRoleById);
router.put('/:id',authenticateToken, RoleController.updateRole);
router.delete('/:id',authenticateToken, RoleController.deleteRole);

module.exports = router;