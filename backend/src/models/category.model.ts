import { Sequelize, DataTypes, Model } from "sequelize";
import { CategoryAttributes, CategoryCreationAttributes } from "../types/category.types";

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public categoryID!: number;
    public categoryName!: String;
    public userID!: number;
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
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "userID",
            }
        }
    }, {
        sequelize,
        tableName: 'Categories' 
        
    }
    )
    return Category;
}