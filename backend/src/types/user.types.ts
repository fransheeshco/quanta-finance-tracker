import { Optional } from "sequelize";

export interface UserAttributes {
    userID: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userID' | 'createdAt' | 'updatedAt'> {}
