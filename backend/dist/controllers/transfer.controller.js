"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndSortByDate = exports.createTransfer = void 0;
const associationblock_1 = require("../models/associationblock");
const updateAccountUtils_1 = require("../utils/updateAccountUtils");
const transactions_types_1 = require("../types/transactions.types");
const createTransfer = async (req, res, next) => {
    const userID = req.userID;
    const { senderID, recipientID, amount, date } = req.body;
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: user ID not found." });
        }
        const account = await associationblock_1.Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found." });
        }
        // 🔒 Ensure the sender is the logged-in user's account
        if (account.accountID !== senderID) {
            return res.status(403).json({ message: "You are not authorized to transfer from this account." });
        }
        const sender = await associationblock_1.Account.findOne({ where: { accountID: senderID } });
        const receiver = await associationblock_1.Account.findOne({ where: { accountID: recipientID } });
        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or recipient account not found." });
        }
        // ❗ Check sender has enough balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance for transfer." });
        }
        const transaction = await associationblock_1.Transaction.create({
            accountID: account.accountID,
            transactionType: transactions_types_1.TransactionType.TRANSFER,
            amount,
            date,
        });
        const transfer = await associationblock_1.Transfer.create({
            amount,
            senderID,
            recipientID,
            transactionID: transaction.transactionID,
        });
        // 💸 Update balances
        const senderNewBalance = sender.balance - amount;
        const receiverNewBalance = receiver.balance + amount;
        const newSenderAccBalance = await (0, updateAccountUtils_1.updateAccountBalance)(sender.accountID, senderNewBalance);
        const newReceiverAccBalance = await (0, updateAccountUtils_1.updateAccountBalance)(receiver.accountID, receiverNewBalance);
        return res.status(201).json({
            message: "Transfer successful.",
            transfer,
            newSenderAccBalance,
            newReceiverAccBalance,
        });
    }
    catch (err) {
        return res.status(400).json({ message: "Could not create transfer transaction." });
    }
};
exports.createTransfer = createTransfer;
const getAndSortByDate = async (req, res, next) => {
    const userID = req.userID;
    try {
        const account = await associationblock_1.Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(401).json({ message: "User account does not exist." });
        }
        const transfers = await associationblock_1.Transfer.findAll({ where: { senderID: account.accountID }, order: [['createdAt', 'DESC']] });
        return res.status(200).json({ message: "Transfers found: ", transfers });
    }
    catch (err) {
        return res.status(401).json({ message: "Could not get Transfers" });
    }
};
exports.getAndSortByDate = getAndSortByDate;
