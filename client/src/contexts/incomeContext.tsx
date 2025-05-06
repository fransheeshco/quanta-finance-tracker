import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";
import { Income } from "../interfaces/interfaces";
import {
  createIncomeAPI,
  deleteIncomeAPI,
  getIncomesAPI,
} from "../api";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type IncomeContextType = {
  incomes: Income[] | null;
  createIncome: (amount: number, date: Date) => Promise<void>;
  deleteIncome: (incomeID: number) => Promise<void>;
  fetchIncome: () => Promise<void>;
};

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const IncomeProvider = ({ children }: Props) => {
  const [incomes, setIncomes] = useState<Income[] | null>(null);
  const { token } = useAuth();

  // Initial fetch to get incomes
  const fetchIncome = useCallback(async () => {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      const fetched = await getIncomesAPI(token);
      if (!fetched) {
        console.log("No incomes data returned");
        setIncomes([]); // Fallback to an empty array
      } else {
        console.log(incomes);
        setIncomes(fetched);
      }
    } catch (error) {
      console.error("Failed to fetch incomes", error);
      toast.error("Failed to fetch incomes");
    }
  }, [token]);

  const createIncome = useCallback(
    async (amount: number, date: Date) => {
      if (!token) return;
      try {
        // Call API to create income
        const newIncome = await createIncomeAPI(amount, date, token); // You get the actual income object here
  
        if (!newIncome) {
          toast.error("Failed to add income (no data received)");
          return;
        }
  
        // Update local state to add new income
        setIncomes((prevIncomes) => {
          if (prevIncomes && Array.isArray(prevIncomes)) {
            return [...prevIncomes, newIncome]; // Add new income to the list
          }
          return [newIncome]; // If prevIncomes is null or undefined, return an array with newIncome
        });
  
        toast.success("Income added!");
      } catch (error) {
        toast.error("Failed to add income");
      }
    },
    [token] // Dependency array
  );
  

  // Delete income and update local state
  const deleteIncome = useCallback(
    async (incomeID: number) => {
      if (!token) return;
      try {
        // Call API to delete income
        await deleteIncomeAPI(incomeID, token);

        // Update local state to remove deleted income
        setIncomes((prevIncomes) => {
          if (prevIncomes) {
            return prevIncomes.filter((income) => income.incomeID !== incomeID); // Remove the deleted income
          }
          return prevIncomes;
        });

        toast.success("Income deleted");
      } catch (error) {
        toast.error("Failed to delete income");
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      fetchIncome();
    }
  }, []);

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        fetchIncome,
        createIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = (): IncomeContextType => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
};
