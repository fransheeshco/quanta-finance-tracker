"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavings = exports.deleteSavings = exports.updateSavings = exports.createSavings = void 0;
const associationblock_1 = require("../models/associationblock");
const sortingAndFilterUtils_1 = require("../utils/sortingAndFilterUtils");
const createSavings = async (req, res, next) => {
    const userID = req.userID;
    const { title, goalAmount, currentAmount } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }
        const savings = await associationblock_1.Saving.create({
            accountID: account.accountID, title: title, goalAmount: goalAmount, currentAmount: currentAmount
        });
        return res.status(200).json({ message: "Savings successfully created.", savings });
    }
    catch (err) {
        return res.status(403).json({ message: "Could not create transaction." });
    }
};
exports.createSavings = createSavings;
const updateSavings = async (req, res, next) => {
    const userID = req.userID;
    const { id: savingID } = req.params;
    const { title, goalAmount, currentAmount } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const savings = await associationblock_1.Saving.findByPk(savingID);
        await savings?.update({
            title: title, goalAmount: goalAmount, currentAmount: currentAmount
        });
        return res.status(201).json({ message: "Savings updated successfully.", savings });
    }
    catch (err) {
        return res.status(500).json({ message: "could not upodate savings." });
    }
};
exports.updateSavings = updateSavings;
const deleteSavings = async (req, res, next) => {
    const userID = req.userID;
    const { id: savingID } = req.params;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const savings = await associationblock_1.Saving.findByPk(savingID);
        if (!savings) {
            return res.status(401).json({ message: "No savings found" });
        }
        await savings?.destroy();
        return res.status(204).json({ message: "Transaction deleted successfully." });
    }
    catch (err) {
        return res.status(500).json({ message: "could not upodate savings." });
    }
};
exports.deleteSavings = deleteSavings;
const getSavings = async (req, res, next) => {
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
        const page = Number(req.query.page) || 1; // Default to page 1 (1-indexed)
        const limit = 5; // Items per page
        const offset = (page - 1) * limit; // Calculate offset for 1-indexed page
        // Build filters using query params
        const filters = {
            title: req.query.title,
        };
        const sortField = req.query.sortField || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'asc';
        const sort = {
            [sortField]: sortDirection,
        };
        // Include accountID so user only sees their own data
        const { where, order } = (0, sortingAndFilterUtils_1.buildQueryOptions)({ filters, sort });
        where.accountID = account.accountID;
        console.log("Where:", where); // Debugging where
        console.log("Order:", order); // Debugging order
        const { rows, count } = await associationblock_1.Saving.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });
        console.log("Rows:", rows); // Check what rows are returned
        console.log("Count:", count); // Check the count
        console.log("Backend Page:", page); // Log the page number
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "No savings found." });
        }
        const totalPages = Math.ceil(count / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        return res.status(200).json({
            message: "Savings found",
            savings: rows,
            count,
            page, // Send back the 1-based page number
            totalPages,
            nextPage,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not get savings." });
    }
};
exports.getSavings = getSavings;
