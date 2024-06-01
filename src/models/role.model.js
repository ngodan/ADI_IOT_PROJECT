const { DataTypes } = require("sequelize");
function model(sequelize) {
    const attributes = {
        pkid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_use: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
    const options = {
        tableName: 'define_roles',
        timestamps:true,
        freezeTableName: true
    };
    return sequelize.define("Role", attributes, options);
}

module.exports = model;




