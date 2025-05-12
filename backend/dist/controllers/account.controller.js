"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalBalance = exports.getAccounts = exports.updateAccount = exports.deleteAccount = exports.addAccount = void 0;
const updateAccountUtils_1 = require("../utils/updateAccountUtils");
const associationblock_1 = require("../models/associationblock");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const addAccount = async (req, res, next) => {
    const userID = req.userID;
    const { balance, accountType } = req.body;
    if (!balance || isNaN(balance) || balance <= 0) {
        return res.status(400).json({ message: "Invalid balance value." });
    }
    if (!accountType || accountType.trim() === "") {
        return res.status(400).json({ message: "Account type is required." });
    }
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.create({
            userID: userID,
            balance: balance,
            accountType: accountType
        });
        return res.status(201).json({ message: "Account created successfully.", account });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create account." });
    }
};
exports.addAccount = addAccount;
const deleteAccount = async (req, res) => {
    const userID = req.userID;
    const { id: accountID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findByPk(accountID);
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }
        await account.destroy();
        return res.status(204).send();
    }
    catch (err) {
        return res.status(500).json({ message: "Could not delete account." });
    }
};
exports.deleteAccount = deleteAccount;
const updateAccount = async (req, res) => {
    const userID = req.userID;
    const { balance, accountType } = req.body;
    const { id } = req.params; // Directly access accountID from params
    try {
        // Check if userID exists
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        // Find account by ID
        const account = await associationblock_1.Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }
        // Update the account balance and accountType
        await account.update({ balance, accountType });
        // Assuming you have a function for updating the account balance
        const updatedAcc = await (0, updateAccountUtils_1.updateAccountBalance)(account.accountID, balance);
        return res.status(200).json({ message: "Account updated successfully", updatedAcc });
    }
    catch (err) {
        console.error("Error updating account:", err);
        return res.status(400).json({
            message: "Could not update account.",
            err
        });
    }
};
exports.updateAccount = updateAccount;
const getAccounts = async (req, res) => {
    const userID = req.userID;
    try {
        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized: No user ID.' });
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5; // Make limit configurable
        const offset = (page - 1) * limit;
        const filters = {
            accountType: req.query.accountType,
        };
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc'
            ? req.query.sortBy
            : 'desc';
        const sort = {
            [sortField]: sortDirection,
        };
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        const { count, rows: accounts } = await associationblock_1.Account.findAndCountAll({
            where,
            order,
            limit: Number(limit),
            offset,
        });
        return res.status(200).json({
            message: 'Accounts found',
            data: {
                count,
                accounts,
                currentPage: Number(page),
                totalPages: Math.ceil(count / Number(limit)),
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving accounts.' });
    }
};
exports.getAccounts = getAccounts;
const totalBalance = async (req, res) => {
    const userID = req.userID;
    let totalBalance = 0;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const accounts = await associationblock_1.Account.findAll({ where: { userID: userID } });
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: "No accounts found." });
        }
        for (const account of accounts) {
            totalBalance += parseFloat(account.balance);
        }
        return res.status(200).json({ totalBalance });
    }
    catch (err) {
        return res.status(401).json({ message: "Could not complete task." });
    }
};
exports.totalBalance = totalBalance;
