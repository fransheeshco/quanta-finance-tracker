import { Request, Response, NextFunction } from "express";
import { updateAccountBalance } from "../utils/updateAccountUtils";
import { Account } from "../models/associationblock";

export const addAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    const account = await Account.create({
      userID: userID,
      balance: balance,
      accountType: accountType
    })
    return res.status(201).json({ message: "Account created successfully.", account})
  } catch (err) {
    return res.status(403).json({ message: "Could not create account." })
  }
}

export const deleteAccount = async (req: Request, res: Response): Promise<any> => {
  const userID = req.userID;
  const { id: accountID } = req.params;

  try {
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: No user ID." });
    }

    const account = await Account.findByPk(accountID);
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    await account.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Could not delete account." });
  }
};


export const updateAccount = async (req: Request, res: Response): Promise<any> => {
  const userID = req.userID;
  const { balance, accountType } = req.body;
  const { id } = req.params;  // Directly access accountID from params

  try {
    // Check if userID exists
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: No user ID." });
    }

    // Find account by ID
    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Update the account balance and accountType
    await account.update({ balance, accountType });

    // Assuming you have a function for updating the account balance
    const updatedAcc = await updateAccountBalance(account.accountID, balance);

    return res.status(200).json({ message: "Account updated successfully", updatedAcc });
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(400).json({
      message: "Could not update account.",
      err
    });
  }
};


import { Op } from 'sequelize';

export const getAccounts = async (req: Request, res: Response): Promise<any> => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'accountType',
    sortDirection = 'asc',
    accountType, // filter param (example)
    minBalance,  // optional filter
    maxBalance   // optional filter
  } = req.query;

  const userID = req.userID || req.params.id;

  try {
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: No user ID." });
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Create filter object
    const filters: any = { userID };

    if (accountType) {
      filters.accountType = accountType;
    }

    if (minBalance || maxBalance) {
      filters.balance = {};
      if (minBalance) filters.balance[Op.gte] = Number(minBalance);
      if (maxBalance) filters.balance[Op.lte] = Number(maxBalance);
    }

    const accounts = await Account.findAll({
      where: filters,
      order: [[String(sortBy), String(sortDirection).toUpperCase()]],
      limit: Number(limit),
      offset
    });

    return res.status(200).json({ message: "Accounts found", accounts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving accounts." });
  }
}

export const totalBalance = async (req: Request, res: Response): Promise<any> => {
  const userID = req.userID;

  let totalBalance = 0;

  try {
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: No user ID." });
    }

    const accounts = await Account.findAll({ where: { userID: userID } });
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: "No accounts found." });
    }


    for (const account of accounts) {
      totalBalance += parseFloat(account.balance as unknown as string);
    }

    return res.status(200).json({ totalBalance });

  } catch (err) {
    return res.status(401).json({ message: "Could not complete task." })
  }
}