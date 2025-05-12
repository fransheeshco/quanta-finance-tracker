"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
const associationblock_1 = require("../models/associationblock");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const createCategory = async (req, res, next) => {
    const userID = req.userID;
    const { categoryName } = req.body;
    try {
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const newCategory = await associationblock_1.Category.create({
            categoryName: categoryName,
            accountID: account.accountID,
        });
        return res.status(200).json({ message: "Category Added.", newCategory });
    }
    catch (err) {
        return res.status(400).json({ message: "Error creating category." });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res, next) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized: No user ID.' });
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5; // Make limit configurable
        const offset = (page - 1) * limit;
        const filters = {
            categoryName: req.query.categoryName, // Explicitly type as potentially undefined
        };
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc'
            ? req.query.sortBy
            : 'desc';
        const sort = {
            [sortField]: sortDirection,
        };
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        const { count, rows: categories } = await associationblock_1.Category.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });
        const totalPages = Math.ceil(count / limit);
        return res.status(200).json({
            message: 'Categories found',
            data: categories, // Rename 'categories' to 'data' for consistency
            count,
            totalPages,
            currentPage: page,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not retrieve categories' });
    }
};
exports.getCategories = getCategories;
const deleteCategory = async (req, res, next) => {
    const userID = req.userID;
    const { id: categoryID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const category = await associationblock_1.Category.findByPk(categoryID);
        if (category?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your category to delete." });
        }
        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully." });
    }
    catch (err) {
        return res.status(401).json({ message: "could not delete category." });
    }
};
exports.deleteCategory = deleteCategory;
const updateCategory = async (req, res, next) => {
    const userID = req.userID;
    const { id: categoryID } = req.params;
    const { categoryName } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const category = await associationblock_1.Category.findByPk(categoryID);
        if (category?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your category to update." });
        }
        await category.update({ categoryName: categoryName });
        return res.status(200).json({ message: "Category update successfuly.", category });
    }
    catch (err) {
        return res.status(401).json({ message: "Could not update category." });
    }
};
exports.updateCategory = updateCategory;
