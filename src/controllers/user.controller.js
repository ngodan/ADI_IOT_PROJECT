
const UserService = require("../services/sequelize/user.service");
const RoleService = require("../services/sequelize/role.service");
const AuthService = require("../services/auth.service");
async function createUser(req, res) {
    try {
        const {user_name,user_password,user_full_name,user_role_name,updatedAt,is_use,notes,user_email} = req.body;
        if(user_name && user_password && user_full_name && user_role_name && updatedAt && is_use){
            const [user_role_id, user_password_hash] = await Promise.all([
                RoleService.getRoleIdByRoleName(user_role_name),
                AuthService.getGenerateHash(user_password)
            ]);
            if (user_role_id != 0) {
                const newUser = await UserService.createUser({ 
                    user_name, 
                    user_password: user_password_hash,
                    user_full_name, 
                    user_email,
                    user_role_id, 
                    updatedAt, 
                    notes, 
                    is_use, 
                    is_active: false
                });
                res.status(201).json({ status: true, message: "Create user successfully", data: newUser });
            } else {
                res.status(201).json({ status: false, message: "Get role data fail" });
            }
        }
        else{
            res.status(201).json({status:false,message:"Insufficient data input"});
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({status:false, message: error.message });
    }
}

// Lấy danh sách tất cả người dùng
async function getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Lấy thông tin của một người dùng bằng ID
async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Cập nhật thông tin của một người dùng bằng ID
async function updateUser(req, res) {
    
    try {
        const {pkid,user_name,user_full_name,user_role_name,updatedAt,is_use,notes,user_email} = req.body;
        if(user_name && user_email && user_full_name && user_role_name && updatedAt && is_use && pkid){
            const [user_role_id] = await Promise.all([
                RoleService.getRoleIdByRoleName(user_role_name),
            ]);
            if (user_role_id != 0) {
                const newUser = await UserService.updateUser({ 
                    pkid,
                    user_name, 
                    user_full_name, 
                    user_email,
                    user_role_id, 
                    updatedAt, 
                    notes, 
                    is_use, 
                });
                console.log(newUser)
                res.status(201).json({ status: true, message: "Update user successfully", data: newUser });
            } else {
                res.status(201).json({ status: false, message: "Get role data fail" });
            }
        }
        else{
            res.status(201).json({status:false,message:"Insufficient data input"});
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({status:false, message: error.message });
    }
}
async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        console.log(userId)
        const user = await UserModel.deleteUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
