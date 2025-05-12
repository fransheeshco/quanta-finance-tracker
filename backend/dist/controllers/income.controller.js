"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncome = exports.getIncome = exports.deleteIncome = exports.addIncome = void 0;
const associationblock_1 = require("../models/associationblock");
const transactions_types_1 = require("../types/transactions.types");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const addIncome = async (req, res, next) => {
    const userID = req.userID;
    const { amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: no user id." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found" });
        }
        const transaction = await associationblock_1.Transaction.create({
            accountID: account?.accountID,
            transactionType: transactions_types_1.TransactionType.INCOME,
            amount: amount,
            date: date,
        });
        const income = await associationblock_1.Income.create({
            accountID: account?.accountID,
            amount: amount,
            date: date,
            transactionID: transaction.transactionID
        });
        return res.status(201).json({ message: "Income added successfully.", income });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create income." });
    }
};
exports.addIncome = addIncome;
const deleteIncome = async (req, res, next) => {
    const userID = req.userID;
    const { id: incomeID } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: no user id." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found" });
        }
        const income = await associationblock_1.Income.findByPk(incomeID);
        if (income?.accountID !== account.accountID) {
            return res.status(401).json({ message: "not your income to delete" });
        }
        await income?.destroy();
        return res.status(204).json({ message: "income deleted successfully." });
    }
    catch (err) {
        return res.status(500).json({ message: "could not delete income." });
    }
};
exports.deleteIncome = deleteIncome;
const getIncome = async (req, res, next) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: no user id." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found" });
        }
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const filters = {
            date: req.query.date,
            amount: req.query.amount
        };
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'desc';
        const sort = {
            [sortField]: sortDirection,
        };
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        const income = await associationblock_1.Income.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });
        return res.status(200).json({ message: "Incomes found", income });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not retrieve income." });
    }
};
exports.getIncome = getIncome;
const updateIncome = async (req, res) => {
    const userID = req.userID;
    const { amount } = req.body;
    const { id: incomeID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: no user id." });
        }
        const income = await associationblock_1.Income.findByPk(incomeID);
        if (!income) {
            return res.status(404).json({ message: "No income found" });
        }
        await income.update({ amount });
        return res.status(200).json({ message: "Incomes found", income });
    }
    catch (err) {
        return res.status(500).json({ message: "could not delete income.", err });
    }
};
exports.updateIncome = updateIncome;
