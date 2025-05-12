"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
const initUserModel = (sequelize) => {
    User.init({
        userID: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'Users',
        sequelize,
        timestamps: true,
    });
    return User;
};
exports.initUserModel = initUserModel;
