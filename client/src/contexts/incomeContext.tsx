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
  incomes: Income[];
  createIncome: (amount: number, date: Date) => Promise<void>;
  deleteIncome: (incomeID: number) => Promise<void>;
  fetchIncome: () => Promise<void>;
  loading: boolean;
};

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const IncomeProvider = ({ children }: Props) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchIncome = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const fetched = await getIncomesAPI(token);
      setIncomes(fetched || []);
    } catch (error) {
      console.error("Failed to fetch incomes", error);
      toast.error("Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createIncome = useCallback(
    async (amount: number, date: Date) => {
      if (!token) return;
      try {
        const newIncome = await createIncomeAPI(amount, date, token);
        if (!newIncome) {
          toast.error("Failed to add income (no data received)");
          return;
        }

        setIncomes((prev) => [...prev, newIncome]);
        fetchIncome();
        toast.success("Income added!");
      } catch (error) {
        toast.error("Failed to add income");
      }
    },
    [token]
  );

  const deleteIncome = useCallback(
    async (incomeID: number) => {
      if (!token) return;
      try {
        await deleteIncomeAPI(incomeID, token);
        setIncomes((prev) =>
          prev.filter((income) => income.incomeID !== incomeID)
        );
        fetchIncome();
        toast.success("Income deleted");
      } catch (error) {
        toast.error("Failed to delete income");
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) fetchIncome();
  }, [fetchIncome, token]);

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        fetchIncome,
        createIncome,
        deleteIncome,
        loading,
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
