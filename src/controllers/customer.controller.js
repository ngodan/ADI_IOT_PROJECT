
const CustomerService = require("../services/sequelize/customer.service");
const RoleService = require("../services/sequelize/role.service");
const AuthService = require("../services/auth.service");
async function createCustomer(req, res) {
    try {
        const {
            customer_name,
            customer_password,
            customer_full_name,
            customer_role_name,
            updatedAt,
            is_use,
            notes,
            customer_email
        } = req.body;

        if(customer_name && customer_password && customer_full_name && customer_role_name && updatedAt && is_use){
            const [customer_role_id, customer_password_hash] = await Promise.all([
                RoleService.getRoleIdByRoleName(customer_role_name),
                AuthService.getGenerateHash(customer_password)
            ]);
            if (customer_role_id != 0) {
                const newCustomer = await CustomerService.createCustomer({ 
                    customer_name, 
                    customer_password: customer_password_hash,
                    customer_full_name, 
                    customer_email,
                    customer_role_id, 
                    updatedAt, 
                    notes, 
                    is_use, 
                    is_active: false
                });
                res.status(201).json({ status: true, message: "Create customer successfully", data: newCustomer });
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
async function getAllCustomers(req, res) {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Lấy thông tin của một người dùng bằng ID
async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await CustomerModel.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Cập nhật thông tin của một người dùng bằng ID
async function updateCustomer(req, res) {
    
    try {
        const {pkid,customer_name,customer_full_name,customer_role_name,updatedAt,is_use,notes,customer_email} = req.body;
        if(customer_name && customer_email && customer_full_name && customer_role_name && updatedAt && is_use && pkid){
            const [customer_role_id, customer_password_hash] = await Promise.all([
                RoleService.getRoleIdByRoleName(customer_role_name),
                AuthService.getGenerateHash(customer_password)
            ]);
            console.log(customer_role_id)
            console.log(customer_password_hash)
            if (customer_role_id != 0) {
                const newCustomer = await CustomerService.updateCustomer({ 
                    pkid,
                    customer_name, 
                    customer_password: customer_password_hash,
                    customer_full_name, 
                    customer_email,
                    customer_role_id, 
                    updatedAt, 
                    notes, 
                    is_use, 
                });
                console.log(newCustomer)
                res.status(201).json({ status: true, message: "Update customer successfully", data: newCustomer });
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
async function deleteCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await CustomerModel.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        await customer.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
