import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { Savings, GetSavingsResponse } from "../interfaces/interfaces";
import { GetSavingsOptions } from "@/interfaces/QueryOptions";
import {
  createSavingsAPI,
  deleteSavingsAPI,
  updateSavingsAPI,
  getSavingsAPI,
} from "../api/SavingsAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type SavingsContextType = {
  savings: Savings[] | undefined;
  savingsCount: number;
  fetchSavings: (options?: GetSavingsOptions) => Promise<Savings[] | null | undefined>;
  createSavings: (title: string, goalAmount: number, currentAmount: number) => Promise<void>;
  deleteSavings: (savingID: number) => Promise<void>;
  updateSavings: (savingID: number, title: string, goalAmount: number, currentAmount: number) => Promise<void>;
};

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const SavingsProvider = ({ children }: Props) => {
  const [savings, setSavings] = useState<Savings[] | undefined>(undefined);
  const [savingsCount, setSavingsCount] = useState(0);
  const { token } = useAuth();

  const fetchSavings = async (
    options: GetSavingsOptions = {}
  ): Promise<Savings[] | null | undefined> => {
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      const response = await getSavingsAPI({ ...options, token });
      if (!response) return;

      // Accessing the rows and count from the response structure
      setSavings(response.savings.rows);
      setSavingsCount(response.savings.count);

      return response.savings.rows;
    } catch (error) {
      console.error("Error fetching savings:", error);
      toast.error("Error fetching savings");
      return null;
    }
  };

  const createSavings = async (
    title: string,
    goalAmount: number,
    currentAmount: number
  ) => {
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      await createSavingsAPI(token, title, goalAmount, currentAmount);
      toast.success("Successfully created savings");
      await fetchSavings();
    } catch (error) {
      console.error(error);
      toast.error("Could not create savings.");
    }
  };

  const updateSavings = async (
    savingID: number,
    title: string,
    goalAmount: number,
    currentAmount: number
  ) => {
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      await updateSavingsAPI(token, title, goalAmount, currentAmount, savingID);
      toast.success("Successfully updated savings");
      await fetchSavings();
    } catch (error) {
      console.error(error);
      toast.error("Could not update savings.");
    }
  };

  const deleteSavings = async (savingID: number) => {
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      await deleteSavingsAPI(token, savingID);
      toast.success("Savings deleted.");
      await fetchSavings();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete savings.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSavings();
    }
  }, [token]);

  return (
    <SavingsContext.Provider
      value={{
        savings,
        savingsCount,
        fetchSavings,
        createSavings,
        deleteSavings,
        updateSavings,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = (): SavingsContextType => {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error("useSavings must be used within a SavingsProvider");
  }
  return context;
};
