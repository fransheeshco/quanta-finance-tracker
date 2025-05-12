import { Request, Response, NextFunction } from "express";
import { updateAccountBalance } from "../utils/updateAccountUtils";
import { Account } from "../models/associationblock";
import { buildQueryOptions } from "../utils/sortingAndFilterUtils"


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
    return res.status(201).json({ message: "Account created successfully.", account })
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

export const getAccounts = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    const sortField = (req.query.sortField as string) || 'createdAt';
    const sortDirection =
      req.query.sortBy === 'asc' || req.query.sortBy === 'desc'
      ? (req.query.sortBy as 'asc' | 'desc')
      : 'desc';

    const sort: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortDirection,
    };

    const { where, order } = buildQueryOptions({ filters, sort });

    const { count, rows: accounts } = await Account.findAndCountAll({
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error retrieving accounts.' });
  }
};


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
