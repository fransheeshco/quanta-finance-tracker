import { ReactNode } from 'react';


export type UserToken = {
  token: string;
  user: {
    userID: number;
    fname: string;
    email: string;
  }
};

export type User = {
  userID: number;
  fname: string;
  email: string;
}

export type Account = {
  accountID: number;
  balance: number;
  accountType: string;
}

export type GetAccountsResponse = {
  accounts: Account[];
};

export type Categories = {
  categoryName: string;
  categoryID: number;
}

export type GetCategoriesResponse = {
  categories: Categories[];
}

export type Expenses = {
  expenseID: number;
  title: string;
  amount: number;
  categoryID: number;
  totalExpenses: number;
  date: Date;
}

export type GetExpenseResponse = {
  expenses: Expenses[];
  totalExpenses: number;
}

export type GetTotalExpensesResponse = {
  totalExpenses: number;
}

export type Income = {
  incomeID: number;
  amount: number;
}

export type GetIncomeResponse = {
  income: Income[];
}

export type Budget = {
  budgetID: number;
  budgetName: string;
  amount: number;
  endDate: Date;
  startDate: Date;
}

export type GetBudgetReponse = {
  budgets: Budget[];
}

export type Savings = {
  savingID: number;
  title: string;
  goalAmount: number; 
  currentAmount: number;
}

export type GetSavingsResponse = {
  savings: Savings[];
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
}  

export type Transactions = {
  transactionID: number;
  transactionType: TransactionType;
  amount: number;
  date: Date;
}

export type GetTransactionResponse = {
  transactions: Transactions[];
}

export type Transfer = {
  transferID: number;
  amount: number;
  senderID: number;
  recipientID: number;
  date: Date;
}

export type GetTransferReponse = {
  transfers: Transfer[];
}