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
  accountID: number;
  createdAt: string;
  updatedAt: string;
}

export type GetCategoriesResponse = {
  message: string;
  categories: {
    count: number;
    rows: Categories[];
  }
}


export type Expenses = {
  expenseID: number;
  title: string;
  amount: number;
  categoryID: number;
  totalExpenses: number;
  date: Date;
  Category?: Categories;
}

export type GetExpenseResponse = {
  message: string;
  expenses: {
    count: number;
    rows: Expenses[]; // Directly assign expenses array to rows
  };
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
  accountID: number;
  budgetName: string;
  amount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type GetBudgetResponse = {
  message: string;
  count: number;
  budgets: Budget[];
};


export type Savings = {
  savingID: number;
  accountID: number; // Include this if you need it
  title: string;
  goalAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
  rows: number;
  count: number
};

export type GetSavingsResponse = {
  savings: {
    count: number;
    rows: Savings[]; // The savings are stored inside `rows`
  };
};


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
};

export type GetTransactionResponse = {
  message: string;
  transactions: {
    count: number;
    rows: Transactions[]; // This is an array of the actual transaction objects
  };
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