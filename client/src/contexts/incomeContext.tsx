import {
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
  updateIncomeAPI
} from "../api/IncomeAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";
import { GetIncomeOptions } from "@/interfaces/QueryOptions";

type IncomeContextType = {
  incomes: Income[];
  createIncome: (amount: number, date: Date) => Promise<void>;
  deleteIncome: (incomeID: number) => Promise<void>;
  fetchIncome: (options?: GetIncomeOptions) => Promise<void>;
  updateIncome: (incomeID: number, amount: number) => Promise<void>;
  loading: boolean;
  incomeCount: number; // Add state for total income count
};

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const IncomeProvider = ({ children }: Props) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [incomeCount, setIncomeCount] = useState(0); // Initialize income count

  const fetchIncome = useCallback(async (filters: GetIncomeOptions = {}) => {
    if (!token) return;

    setLoading(true);
    try {
        const data = await getIncomesAPI(filters);
        if (data) { // Only need to check if the overall response is defined
          console.log("Raw fetchedResponse:", data);

            setIncomes(data.income.rows);
            setIncomeCount(data.income.count);
        } else {
            setIncomes([]);
            setIncomeCount(0);
        }
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

              // Optimistically update the state, and then refetch for consistency
              setIncomes((prev) => [...prev, newIncome]);
              fetchIncome();
              toast.success("Income added!");
          } catch (error) {
              toast.error("Failed to add income");
          }
      },
      [token, fetchIncome]
  );

  const deleteIncome = useCallback(
      async (incomeID: number) => {
          if (!token) return;
          try {
              await deleteIncomeAPI(incomeID, token);
              // Optimistically update the state, and then refetch for consistency
              setIncomes((prev) =>
                  prev.filter((income) => income.incomeID !== incomeID)
              );
              fetchIncome();
              toast.success("Income deleted");
          } catch (error) {
              toast.error("Failed to delete income");
          }
      },
      [token, fetchIncome]
  );

  const updateIncome = useCallback(
      async (incomeID: number, amount: number) => {
          if (!token) return;
          try {
              const updated = await updateIncomeAPI(token, amount, incomeID);
               console.log(updated);

              setIncomes((prev) =>
                  prev.map((income) =>
                      income.incomeID === incomeID ? { ...income, amount } : income
                  )
              );

              toast.success("Income updated!");
          } catch (error) {
              toast.error("Failed to update income");
          }
      },
      [token]
  );


  useEffect(() => {
      if (token) fetchIncome(); // Fetch initial data
  }, [fetchIncome, token]);

  return (
      <IncomeContext.Provider
          value={{
              incomes,
              fetchIncome,
              createIncome,
              deleteIncome,
              updateIncome,
              loading,
              incomeCount, // Provide the income count
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