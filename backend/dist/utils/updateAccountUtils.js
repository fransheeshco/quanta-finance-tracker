"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountBalance = void 0;
const associationblock_1 = require("../models/associationblock");
const updateAccountBalance = async (accountID, newBalance) => {
    const account = await associationblock_1.Account.findByPk(accountID);
    if (!account) {
        throw new Error("Account not found.");
    }
    await account.update({
        balance: newBalance
    });
    return account.balance;
};
exports.updateAccountBalance = updateAccountBalance;
