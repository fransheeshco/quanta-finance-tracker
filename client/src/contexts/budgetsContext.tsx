import {
  createContext,
  useEffect,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from "react";
import { Budget } from "../interfaces/interfaces";
import {
  createBudgetAPI,
  deleteBudgetAPI,
  updateBudgetAPI,
  getBudgetAPI,
} from "../api/BudgetsAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type BudgetTypeContext = {
  budgets: Budget[] | null;
  totalBudgets: number;
  fetchBudgets: (
    page?: number,
    sortField?: string,
    sortBy?: "asc" | "desc"
  ) => Promise<void>;
  addBudget: (
    budgetName: string,
    amount: number,
    startDate: Date,
    endDate: Date
  ) => Promise<void>;
  editBudget: (
    budgetID: number,
    budgetName: string,
    amount: number,
    startDate: Date,
    endDate: Date
  ) => Promise<void>;
  removeBudget: (budgetID: number) => Promise<void>;
};

type Props = {
  children: ReactNode;
};

const BudgetContext = createContext<BudgetTypeContext | undefined>(undefined);

export const BudgetProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useState<Budget[] | null>(null);
  const [totalBudgets, setTotalBudgets] = useState<number>(0);
  const { token } = useAuth();

  const fetchBudgets = useCallback(
    async (
      page: number = 1,
      sortField: string = "budgetName",
      sortBy: "asc" | "desc" = "asc"
    ) => {
      if (!token) return;
      try {
        const fetched = await getBudgetAPI({
          token,
          sortField,
          sortBy,
          page,
        });
        if (fetched) {
          setBudgets(fetched.budgets);
          setTotalBudgets(fetched.count);
          console.log("Total number of budgets:", fetched.count);
        } else {
          setBudgets(null);
          setTotalBudgets(0);
        }
      } catch (err) {
        console.error("Error fetching budgets:", err);
        setBudgets(null);
        setTotalBudgets(0);
      }
    },
    [token]
  );


  const addBudget = async (
    budgetName: string,
    amount: number,
    startDate: Date,
    endDate: Date
  ) => {
    if (!token) return;

    try {
      const newBudget = await createBudgetAPI(token, budgetName, amount, startDate, endDate);
      if (newBudget) {
        await fetchBudgets();
        toast.success("Budget added!");
      } else {
        toast.error("Failed to add budget.");
      }
    } catch {
      toast.error("Failed to add budget.");
    }
  };

  const editBudget = async (
    budgetID: number,
    budgetName: string,
    amount: number,
    startDate: Date,
    endDate: Date
  ) => {
    if (!token) return;

    try {
      const updatedBudget = await updateBudgetAPI(
        token,
        budgetID,
        budgetName,
        amount,
        startDate,
        endDate
      );
      if (updatedBudget) {
        await fetchBudgets();
        toast.success("Budget updated!");
      } else {
        toast.error("Failed to update budget.");
      }
    } catch {
      toast.error("Failed to update budget.");
    }
  };

  const removeBudget = async (budgetID: number) => {
    if (!token) return;

    try {
      const deletedBudget = await deleteBudgetAPI(token, budgetID);
      if (deletedBudget) {
        await fetchBudgets();
        toast.success("Budget deleted.");
      } else {
        toast.error("Failed to delete budget.");
      }
    } catch {
      toast.error("Failed to delete budget.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchBudgets();
    } else {
      setBudgets(null);
      setTotalBudgets(0);
    }
  }, [token, fetchBudgets]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        totalBudgets,
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

export const useBudgets = (): BudgetTypeContext => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
};