import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import { Category, User, Account } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID
    const { categoryName } = req.body;

    try {
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const newCategory = await Category.create({
            categoryName: categoryName,
            accountID: account.accountID,
        });
        return res.status(200).json({ message: "Category Added.", newCategory });
    } catch (err) {
        return res.status(400).json({ message: "Error creating category." });
    }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const categories = await Category.findAll({ where: { accountID: account.accountID } });
        return res.status(200).json({ message: "Categories", categories })
    } catch (err) {
        return res.status(401).json({ message: "could not retrieve categories" });
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const category = await Category.findByPk(categoryID);
        if (category?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your category to delete." });
        }
        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully." });
    } catch (err) {
        return res.status(401).json({ message: "could not delete category." });
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID, categoryName } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const category = await Category.findByPk(categoryID);
        if (category?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your category to update." });
        }
        await category.update({ categoryName: categoryName });
        return res.status(200).json({ message: "Category update successfuly.", category });
    } catch (err) {
        return res.status(401).json({ message: "Could not update category." });
    }
}