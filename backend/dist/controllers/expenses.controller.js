"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAllExpenses = exports.getExpenseByCategory = exports.getExpense = exports.deleteExpense = exports.updateExpense = exports.createExpense = void 0;
const associationblock_1 = require("../models/associationblock");
const transactions_types_1 = require("../types/transactions.types");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const createExpense = async (req, res, next) => {
    const userID = req.userID;
    const { categoryID, title, amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const transaction = await associationblock_1.Transaction.create({
            accountID: account.accountID,
            transactionType: transactions_types_1.TransactionType.EXPENSE,
            amount: amount,
            date: date,
        });
        const category = await associationblock_1.Category.findOne({
            where: { accountID: account.accountID, categoryID: categoryID },
        });
        if (!category) {
            return res.status(404).json({ message: "No category found." });
        }
        const expense = await associationblock_1.Expense.create({
            accountID: account.accountID, categoryID: categoryID, transactionID: transaction.transactionID, title: title, amount: amount, date: date
        });
        return res.status(201).json({ message: "Expense successfully created.", expense });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create transaction." });
    }
};
exports.createExpense = createExpense;
const updateExpense = async (req, res, next) => {
    const userID = req.userID;
    const { id: expenseID } = req.params;
    const { title, amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const expense = await associationblock_1.Expense.findByPk(expenseID);
        console.log('Retrieved Expense:', expense);
        console.log('User ID:', userID);
        console.log('Expense ID:', expenseID);
        if (!expense) {
            return res.status(401).json({ message: "expense not found" });
        }
        await expense?.update({
            title, amount, date
        });
        return res.status(201).json({ message: "Expense updated successfully.", expense });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update expense." });
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res, next) => {
    const userID = req.userID;
    const { id: expenseID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const expense = await associationblock_1.Expense.findByPk(expenseID);
        if (expense?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your expense to delete." });
        }
        await expense?.destroy();
    }
    catch (err) {
        return res.status(500).json({ message: "could not delete expenses." });
    }
};
exports.deleteExpense = deleteExpense;
const getExpense = async (req, res, next) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        // Pagination setup
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        // Build filters using query params
        const filters = {
            title: req.query.title,
            categoryID: req.query.categoryID,
        };
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'desc';
        const sort = {
            [sortField]: sortDirection,
        };
        // Include accountID so user only sees their own data
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        console.log("Where:", where); // Debugging where
        console.log("Order:", order); // Debugging order
        const { rows, count } = await associationblock_1.Expense.findAndCountAll({
            where,
            order,
            limit,
            offset,
            include: [
                {
                    model: associationblock_1.Category,
                    attributes: ['categoryName'], // Only include the name
                },
            ],
        });
        console.log("Rows:", rows); // Check what rows are returned
        console.log("Count:", count); // Check the count
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "No expenses found." });
        }
        return res.status(200).json({
            message: "Expenses found",
            expenses: rows, // renamed to match expectation
            count, // this is your expenseCount
            page
        });
    }
    catch (err) {
        console.error(err); // Log any errors
        return res.status(500).json({ message: "Could not get expenses." });
    }
};
exports.getExpense = getExpense;
const getExpenseByCategory = async (req, res, next) => {
    const userID = req.userID;
    const { categoryID } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const expenses = await associationblock_1.Expense.findAll({ where: { categoryID: categoryID, accountID: account.accountID } });
        if (!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        return res.status(200).json({ message: "Expenses found:", expenses });
    }
    catch (err) {
        return res.status(500).json({ message: "could not get expenses." });
    }
};
exports.getExpenseByCategory = getExpenseByCategory;
const addAllExpenses = async (req, res, next) => {
    const userID = req.userID;
    let totalExpense = 0;
    if (!userID) {
        return res.status(401).json({ message: "Unauthorized: no userID" });
    }
    try {
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        const expenses = await associationblock_1.Expense.findAll({ where: { accountID: account?.accountID } });
        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: "No accounts found." });
        }
        for (const expense of expenses) {
            totalExpense += parseFloat(expense.amount);
        }
        return res.status(200).json({ totalExpense });
    }
    catch (error) {
        return res.status(400).json({ message: "Error occured KAJSHDAKJHD" });
    }
};
exports.addAllExpenses = addAllExpenses;
