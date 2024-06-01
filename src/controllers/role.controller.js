
const RoleService = require("../services/sequelize/role.service");
// Tạo người dùng mới
async function createRole(req, res) {
    try {
        const { Rolename, password, email } = req.body;
        const newRole = await RoleModel.create({ Rolename, password, email });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Lấy danh sách tất cả người dùng
async function getAllRoles(req, res) {
    try {
        const Roles = await RoleService.getAllRoles();
        res.status(200).json(Roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Lấy thông tin của một người dùng bằng ID
async function getRoleById(req, res) {
    try {
        const RoleId = req.params.id;
        const Role = await RoleModel.findByPk(RoleId);
        if (!Role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(Role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Cập nhật thông tin của một người dùng bằng ID
async function updateRole(req, res) {
    try {
        const RoleId = req.params.id;
        const { Rolename, password, email } = req.body;
        const Role = await RoleModel.findByPk(RoleId);
        if (!Role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        Role.Rolename = Rolename;
        Role.password = password;
        Role.email = email;
        await Role.save();
        res.status(200).json(Role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Xóa một người dùng bằng ID
async function deleteRole(req, res) {
    try {
        const RoleId = req.params.id;
        const Role = await RoleModel.findByPk(RoleId);
        if (!Role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        await Role.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
