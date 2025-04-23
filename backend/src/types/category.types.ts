import { Optional } from "sequelize";

export interface CategoryAttributes {
    categoryID: number;
    categoryName: String;
    userID: number,
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "categoryID"> {}