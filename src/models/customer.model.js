const { DataTypes } = require("sequelize");
function model(sequelize) {
    const attributes = {
        pkid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        customer_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        customer_hot_line: {
            type: DataTypes.STRING,
            allowNull: true
        },
        customer_website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        membership_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_use: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
    const options = {
        tableName: 'define_customers',
        timestamps:true,
        freezeTableName: true
    };
    return sequelize.define("Customer", attributes, options);
}

module.exports = model;




