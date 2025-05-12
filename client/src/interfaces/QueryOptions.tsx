import { string } from "yup";

export interface GetTransactionsOptions {
  page?: number;
  limit?: number;
  transactionType?: 'income' | 'expense';
  sortField?: string;
  sortBy?: 'asc' | 'desc';
  token?: string;
}

export interface GetExpensesOptions {
  page?: number;
  limit?: number;
  categoryID?: number;
  sortField?: string;
  sortBy?: 'asc' | 'desc';
  token?: string;
}

export interface GetBudgetsOptions {
  token? : string;
  limit?: number; 
  sortField?: string;
  sortBy?: 'asc' | 'desc';
  page?: number;
}

// interfaces/QueryOptions.ts
export interface GetSavingsOptions {
  token?: string;
  limit?: number;
  sortField?: string;
  sortBy?: 'asc' | 'desc';
  page?: number;
}

export interface GetCategoriesOptions {
  token?: string;
  sortField?: string;
  sortBy?: "asc" | "desc";
  page?: number;
  categoryID?: string | number;
}

export interface GetIncomeOptions {
  token?: string;
  incomeID?: number; 
  sortField?: string;
  limit?: number;
  sortBy?: 'asc' | 'desc';
  page?: number;
}

export interface GetAccountsOptions {
  token?: string;
  accountID?: number; 
  sortField?: string;
  limit?: number;
  sortBy?: 'asc' | 'desc';
  page?: number;
  search?: string; 
}