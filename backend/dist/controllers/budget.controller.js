"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgets = exports.deleteBudget = exports.updateBudget = exports.createBudget = void 0;
const associationblock_1 = require("../models/associationblock");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const createBudget = async (req, res, next) => {
    const userID = req.userID;
    const { budgetName, amount, startDate, endDate } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const budget = await associationblock_1.Budget.create({
            accountID: account.accountID, budgetName: budgetName, amount: amount, startDate: startDate, endDate: endDate
        });
        return res.status(201).json({ message: "Budget created successfully.", budget });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create budget." });
    }
};
exports.createBudget = createBudget;
const updateBudget = async (req, res, next) => {
    const userID = req.userID;
    const { budgetName, amount, startDate, endDate } = req.body;
    const { id: budgetID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const budget = await associationblock_1.Budget.findByPk(budgetID);
        if (budget?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your budget to update." });
        }
        await budget?.update({
            budgetName: budgetName,
            amount: amount,
            startDate: startDate,
            endDate: endDate
        });
        return res.status(200).json({ message: "Budget update successfuly.", budget });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update category." });
    }
};
exports.updateBudget = updateBudget;
const deleteBudget = async (req, res, next) => {
    const userID = req.userID;
    const { id: budgetID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const budget = await associationblock_1.Budget.findByPk(budgetID);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found." });
        }
        if (budget.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your budget to delete." });
        }
        await budget?.destroy();
        return res.status(204).json({ message: "Budget deleted successfully." });
    }
    catch (err) {
        return res.status(401).json({ message: "could not delete budget." });
    }
};
exports.deleteBudget = deleteBudget;
const getBudgets = async (req, res, next) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const filters = {
            budgetName: req.query.budgetName
        };
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'asc';
        const sort = {
            budgetName: sortDirection,
        };
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        const budgets = await associationblock_1.Budget.findAndCountAll({
            where,
            order,
            limit,
            offset
        });
        if (!budgets || budgets.count === 0) {
            return res.status(404).json({ message: "No budgets found." });
        }
        // Return the proper structure with count and rows
        return res.status(200).json({
            message: "Budgets found:",
            count: budgets.count,
            budgets: budgets.rows // Return only the actual rows (budgets)
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not retrieve budgets", error: err });
    }
};
exports.getBudgets = getBudgets;
