import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import { Category, User, Account } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";
import { buildQueryOptions } from '../utils/sortingAndFilterUtils';

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

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const userID = req.userID;

    try {
        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized: No user ID.' });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5; // Make limit configurable
        const offset = (page - 1) * limit;

        const filters = {
            categoryName: req.query.categoryName as string | undefined, // Explicitly type as potentially undefined
        };

        const sortField = (req.query.sortField as string) || 'createdAt';
        const sortDirection =
            req.query.sortBy === 'asc' || req.query.sortBy === 'desc'
                ? (req.query.sortBy as 'asc' | 'desc')
                : 'desc';

        const sort: Record<string, 'asc' | 'desc'> = {
            [sortField]: sortDirection,
        };

        const account = await Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const { where, order } = buildQueryOptions({ filters, sort });
        where.accountID = account.accountID;

        const { count, rows: categories } = await Category.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            message: 'Categories found',
            data: {
              count,
              rows: categories,
            },
            totalPages,
            currentPage: page,
          });          
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not retrieve categories' });
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const {id : categoryID} = req.params;

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
    const {id : categoryID} = req.params;
    const { categoryName } = req.body;

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