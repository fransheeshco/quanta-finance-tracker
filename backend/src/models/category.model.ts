import { Sequelize, DataTypes, Model } from "sequelize";
import { CategoryAttributes, CategoryCreationAttributes } from "../types/category.types";
import sequelize from "../config/db";

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public categoryID!: number;
    public categoryName!: String;
}

export const initCategoryModel = (sequelize: Sequelize) => {
    Category.init({
        categoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'Categories' 
        
    }
    )
    return Category;
}