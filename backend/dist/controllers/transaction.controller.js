"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = void 0;
const associationblock_1 = require("../models/associationblock");
const transactions_types_1 = require("../types/transactions.types");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const createTransaction = async (req, res, next) => {
    const userID = req.userID;
    const { transactionType, amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "no account found." });
        }
        const transaction = await associationblock_1.Transaction.create({
            accountID: account?.accountID,
            transactionType: transactionType,
            amount: amount,
            date: date,
        });
        return res.status(201).json({ message: "Transaction created successfully.", transaction });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create transaction." });
    }
};
exports.createTransaction = createTransaction;
const updateTransaction = async (req, res, next) => {
    const userID = req.userID;
    const { id: transactionID } = req.params;
    const { transactionType, amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found." });
        }
        const transaction = await associationblock_1.Transaction.findByPk(transactionID);
        if (!transaction) {
            return res.status(404).json({ message: "No transaction found." });
        }
        await transaction?.update({
            accountID: account.accountID,
            transactionType: transactionType,
            amount: amount,
            date: date,
        });
        return res.status(200).json({ message: "Transaction update successfuly.", transaction });
    }
    catch (err) {
        return res.status(500).json({ message: "could not upodate transaction." });
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res, next) => {
    const userID = req.userID;
    const { id: transactionID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const transaction = await associationblock_1.Transaction.findByPk(transactionID);
        if (!transaction) {
            return res.status(404).json({ message: "No transaction found." });
        }
        await transaction?.destroy();
        return res.status(200).json({ message: "Transaction deleted successfully." });
    }
    catch (err) {
        return res.status(401).json({ message: "could not delete transaction." });
    }
};
exports.deleteTransaction = deleteTransaction;
const getTransactions = async (req, res, next) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found." });
        }
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        // Initialize filters
        const filters = {};
        // Safely extract transactionType from query string
        const transactionTypeParam = req.query.transactionType;
        if (typeof transactionTypeParam === 'string') {
            const formattedType = transactionTypeParam.toLowerCase();
            if (formattedType === transactions_types_1.TransactionType.INCOME ||
                formattedType === transactions_types_1.TransactionType.EXPENSE ||
                formattedType === transactions_types_1.TransactionType.TRANSFER) {
                filters.transactionType = formattedType;
            }
        }
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc'
            ? req.query.sortBy
            : 'desc';
        const sort = {
            [sortField]: sortDirection,
        };
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        const transactions = await associationblock_1.Transaction.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });
        return res.status(200).json({ message: "transactions: ", transactions });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not retrieve transactions.", err });
    }
};
exports.getTransactions = getTransactions;
