import { Optional } from "sequelize";

export interface CategoryAttributes {
    categoryID: number;
    categoryName: String;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "categoryID"> {}