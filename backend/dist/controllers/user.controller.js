"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const associationblock_1 = require("../models/associationblock");
const getUserInfo = async (req, res) => {
    const userID = req.userID;
    try {
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        const expenses = await associationblock_1.Expense.findAll({ where: { accountID: account?.accountID } });
        const transactions = await associationblock_1.Transaction.findAll({ where: { accountID: account?.accountID } });
        const savings = await associationblock_1.Saving.findAll({ where: { accountID: account?.accountID } });
        const budgets = await associationblock_1.Budget.findAll({ where: { accountID: account?.accountID } });
        const incomes = await associationblock_1.Income.findAll({ where: { accountID: account?.accountID } });
        if (!userID) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        if (!budgets) {
            return res.status(404).json({ message: "No budgets found." });
        }
        if (!savings) {
            return res.status(404).json({ message: "No savings found." });
        }
        if (!transactions) {
            return res.status(404).json({ message: "No transactions found." });
        }
        if (!incomes) {
            return res.status(404).json({ message: "No income found." });
        }
        res.status(200).json({ expenses, budgets, incomes, savings, transactions });
    }
    catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Server error." });
    }
};
exports.getUserInfo = getUserInfo;
