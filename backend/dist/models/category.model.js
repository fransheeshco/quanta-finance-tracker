"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCategoryModel = void 0;
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
}
const initCategoryModel = (sequelize) => {
    Category.init({
        categoryID: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        accountID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }, {
        sequelize,
        tableName: 'Categories'
    });
    return Category;
};
exports.initCategoryModel = initCategoryModel;
