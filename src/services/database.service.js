const { Sequelize } = require("sequelize");
const UserModel = require("../models/user.model");
const CustomerModel = require("../models/customer.model");
const RoleModel = require("../models/role.model");
require("dotenv").config();

let dbContextInstance = {};

async function connectToDatabase() {
    try {
        const sequelize = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: process.env.DIALECT,
                dialectOptions: {
                    options: { encrypt: false },
                },
                logging: false
            },
        );
        await sequelize.authenticate();
        console.log('Connected to SQL Server');
        return sequelize;
    } catch (error) {
        console.error('Failed to connect to SQL Server', error);
        throw error;
    }
}

async function initializeDbContext() {
    try {
        const sequelizeInstance = await connectToDatabase();
        dbContextInstance.User = UserModel(sequelizeInstance);
        dbContextInstance.Customer = CustomerModel(sequelizeInstance);
        dbContextInstance.Role = RoleModel(sequelizeInstance);
        dbContextInstance.sequelize = sequelizeInstance;
        await sequelizeInstance.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error initializing DbContext:', error);
        throw error;
    }
}
const getDbContext = () => {
    if (!dbContextInstance) {
      throw new Error('Database context has not been initialized.');
    }
    return dbContextInstance;
};
module.exports =  {
    initializeDbContext,
    getDbContext
};
