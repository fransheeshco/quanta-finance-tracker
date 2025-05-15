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
  message: string;
  data: { // Add the 'data' property
    count: number;
    accounts: Account[]; // Rename 'rows' to 'accounts' to match your API response
    currentPage?: number; // Add currentPage if it's part of your response
    totalPages?: number;  // Add totalPages if it's part of your response
  };
};

export type Categories = {
  categoryID: number;
  categoryName: string;
  accountID: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCategoriesResponse = {
  message: string;
  data: {
      count: number;
      rows: Categories[];
  };
};

export type Expenses = {
  expenseID: number;
  title: string;
  amount: number;
  categoryID: number;
  categoryName: string;
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
  expenseID: number;
  amount: number;
  date: Date;
}

export type GetIncomeResponse = {
  message: string;
  income: {
    count: number;
    rows: Income[];
  } 
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
  accountID: number;
  title: string;
  goalAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
  rows: number;
};

export type GetSavingsResponse = {
  savings: Savings[];     // The actual data for the current page
  count: number;          // Total count of savings
  page: number;           // Current page number
  totalPages: number;     // Total number of pages
  nextPage: number | null; // Next page number (null if there is no next page)
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