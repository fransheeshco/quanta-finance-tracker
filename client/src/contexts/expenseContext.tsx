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
    fetchExpenses: () => Promise<void>;
    createExpense: ( title: string, amount: number, date: Date, categoryID: number) => Promise<void>;
    updateExpense: (title: string, amount: number, expenseID: number, date: Date, categoryID: number) => Promise<void>;
    deleteExpenses: (expenseID: number) => Promise<void>;
}

type Props = { children: ReactNode}; 

const ExpenseContext = createContext<ExpenseContextType | null>({} as ExpenseContextType);

export const ExpenseProvider = ({children}: Props) => {
    const [expenses, setExpenses] = useState<Expenses[] | null>(null);
    const { user, token} = useAuth();

    const fetchExpenses = useCallback(async () => {
        if (!token) return;
        try {
          const fetched = await getExpensesAPI(token);
          if (fetched) setExpenses(fetched);
        } catch (err) {
          toast.error("Failed to fetch Expenses");
        }
      }, []); 

      const createExpense = useCallback(
        async (title: string, amount: number, date: Date, categoryID: number) => {
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
        async (title: string, amount: number, expenseID: number, date: Date, categoryID: number) => {
          if (!token) return;
          try {
            await updateExpensesAPI(token, expenseID, title, amount, date, categoryID);
            await fetchExpenses();
            toast.success("Category updated!");
          } catch {
            toast.error("Failed to update category.");
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
            toast.success("Category deleted.");
          } catch {
            toast.error("Failed to delete category.");
          }
        },
        [token, fetchExpenses]
      );

      useEffect(() => {
        if (user && token && expenses?.length === 0) {
          fetchExpenses();
        }
      }, []);
      const contextValue = useMemo(
        () => ({
          expenses,
          fetchExpenses,
          createExpense,
          updateExpense,
          deleteExpenses,
        }),
        [expenses, fetchExpenses, createExpense, updateExpense, deleteExpenses]
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
  