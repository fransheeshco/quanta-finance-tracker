import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Expenses } from "../interfaces/interfaces";
import {
  createExpenseAPI,
  deleteExpensesAPI,
  updateExpensesAPI,
  getExpensesAPI,
} from "../api";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type ExpenseContextType = {
  expenses: Expenses[] | null;
  loading: boolean;
  fetchExpenses: () => Promise<void>;
  createExpense: (
    title: string,
    amount: number,
    date: Date,
    categoryID: number
  ) => Promise<void>;
  updateExpense: (
    title: string,
    amount: number,
    expenseID: number,
    date: Date,
    categoryID: number
  ) => Promise<void>;
  deleteExpenses: (expenseID: number) => Promise<void>;
  getTotalExpenses: () => number;
};

type Props = { children: ReactNode };

const ExpenseContext = createContext<ExpenseContextType | null>(
  {} as ExpenseContextType
);

export const ExpenseProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<Expenses[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, token } = useAuth();

  const fetchExpenses = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const fetched = await getExpensesAPI(token);
      if (fetched) setExpenses(fetched);
    } catch (err) {
      toast.error("Failed to fetch Expenses");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createExpense = useCallback(
    async (
      title: string,
      amount: number,
      date: Date,
      categoryID: number
    ) => {
      if (!token) return;
      try {
        await createExpenseAPI(token, title, amount, date, categoryID);
        await fetchExpenses();
        toast.success("Expenses added!");
      } catch {
        toast.error("Failed to add expenses.");
      }
    },
    [token, fetchExpenses]
  );

  const updateExpense = useCallback(
    async (
      title: string,
      amount: number,
      expenseID: number,
      date: Date,
      categoryID: number
    ) => {
      if (!token) return;
      try {
        await updateExpensesAPI(
          token,
          expenseID,
          title,
          amount,
          date,
          categoryID
        );
        await fetchExpenses();
        toast.success("Expense updated!");
      } catch {
        toast.error("Failed to update expense.");
      }
    },
    [token, fetchExpenses]
  );

  const deleteExpenses = useCallback(
    async (expenseID: number) => {
      if (!token) return;
      try {
        await deleteExpensesAPI(expenseID, token);
        await fetchExpenses();
        toast.success("Expense deleted.");
      } catch {
        toast.error("Failed to delete expense.");
      }
    },
    [token, fetchExpenses]
  );

  const getTotalExpenses = useCallback(() => {
    return expenses?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0;
  }, [expenses]);

  useEffect(() => {
    if (user && token) {
      fetchExpenses();
    }
  }, [user, token, fetchExpenses]);

  const contextValue = useMemo(
    () => ({
      expenses,
      loading,
      fetchExpenses,
      createExpense,
      updateExpense,
      deleteExpenses,
      getTotalExpenses,
    }),
    [expenses, loading, fetchExpenses, createExpense, updateExpense, deleteExpenses, getTotalExpenses]
  );

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
