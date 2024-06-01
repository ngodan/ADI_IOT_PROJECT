const { DataTypes } = require("sequelize");


function model(sequelize) {
    const attributes = {
        pkid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_use: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
    const options = {
        tableName: 'define_users',
        timestamps:true,
        freezeTableName: true
    };
    return sequelize.define("User", attributes, options);
}

module.exports = model;




