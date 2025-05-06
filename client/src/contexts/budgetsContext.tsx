import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { Budget } from "../interfaces/interfaces";
import {
  createBudgetAPI,
  deleteBudgetAPI,
  updateBudgetAPI,
  getBudgetAPI,
} from "../api";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type BudgetTypeContext = {
  budgets: Budget[] | null;
  fetchBudgets: () => Promise<void>;
  addBudget: (budgetName: string, amount: number, startDate: Date, endDate: Date) => Promise<void>;
  editBudget: (budgetID: number, budgetName: string, amount: number, endDate: Date, startDate: Date) => Promise<void>;
  removeBudget: (budgetID: number) => Promise<void>;
};

type Props = {
  children: ReactNode;
};

const BudgetContext = createContext<BudgetTypeContext | undefined>(undefined);

export const BudgetProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useState<Budget[] | null>(null);
  const { token } = useAuth();

  const fetchBudgets = async () => {
    if (!token) return;
    try {
      const fetched = await getBudgetAPI(token);
      if (fetched) setBudgets(fetched);
    } catch (err) {
      toast.error("Failed to fetch budgets");
    }
  };

  const addBudget = async (budgetName: string, amount: number, startDate: Date, endDate: Date) => {
    if (!token) return;
    try {
      await createBudgetAPI(token, budgetName, amount, startDate, endDate);
      await fetchBudgets();
      toast.success("Budget added!");
    } catch {
      toast.error("Failed to add budget.");
    }
  };

  const editBudget = async (budgetID: number, budgetName: string, amount: number, endDate: Date, startDate: Date) => {
    if (!token) return;
    try {
      await updateBudgetAPI(token, budgetID, budgetName, amount, endDate, startDate);
      await fetchBudgets();
      toast.success("Budget updated!");
    } catch {
      toast.error("Failed to update budget.");
    }
  };

  const removeBudget = async (budgetID: number) => {
    if (!token) return;
    try {
      await deleteBudgetAPI(token, budgetID);
      await fetchBudgets();
      toast.success("Budget deleted.");
    } catch {
      toast.error("Failed to delete budget.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchBudgets();
    }
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        fetchBudgets,
        addBudget,
        editBudget,
        removeBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// ✅ Stable and HMR-friendly hook export
export const useBudgets = (): BudgetTypeContext => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
};
