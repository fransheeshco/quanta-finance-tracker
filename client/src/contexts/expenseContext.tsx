import {
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
} from "../api/ExpensesAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";
import { GetExpensesOptions } from "../interfaces/QueryOptions"; // 👈 adjust import path if needed

type ExpenseContextType = {
  expenses: Expenses[] | null;
  expenseCount: number;
  loading: boolean;
  fetchExpenses: (filters: GetExpensesOptions) => Promise<void>; // ✅ updated
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
  deleteExpense: (expenseID: number) => Promise<void>;
  getTotalExpenses: () => number;
};

type Props = { children: ReactNode };

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<Expenses[] | null>(null);
  const [expenseCount, setExpenseCount] = useState(0);
  const [loading] = useState<boolean>(false);
  const { token, user } = useAuth();

  const fetchExpenses = useCallback(
    async (filters: GetExpensesOptions) => { // ✅ updated
      console.log('Fetching expenses with filters:', filters);
      try {
        const data = await getExpensesAPI(filters);
        if (data) {
          setExpenses(data.expenses.rows);
          setExpenseCount(data.expenses.count);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    },
    []
  );

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
        toast.success("Expense added!");
        await fetchExpenses({ page: 1, limit: 5 }); // ✅ safe now
      } catch {
        toast.error("Failed to add expense.");
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
        await updateExpensesAPI(title, expenseID, token, amount, date, categoryID);
        toast.success("Expense updated!");
        await fetchExpenses({ page: 1, limit: 5 }); // ✅ safe now
      } catch {
        toast.error("Failed to update expense.");
      }
    },
    [token, fetchExpenses]
  );

  const deleteExpense = useCallback(
    async (expenseID: number) => {
      if (!token) return;
      try {
        await deleteExpensesAPI(expenseID, token);
        toast.success("Expense deleted.");
        await fetchExpenses({ page: 1, limit: 5 }); // ✅ safe now
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
      console.log('Expenses state:', expenses);
      fetchExpenses({ page: 1, limit: 5 }); // ✅ safe now
    }
  }, [user, token, fetchExpenses]);

  const value = useMemo(
    () => ({
      expenses,
      loading,
      fetchExpenses,
      createExpense,
      updateExpense,
      deleteExpense,
      getTotalExpenses,
      expenseCount,
    }),
    [expenses, loading, fetchExpenses, createExpense, updateExpense, deleteExpense, getTotalExpenses, expenseCount]
  );

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
