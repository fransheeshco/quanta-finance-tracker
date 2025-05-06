import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    useContext,
    ReactNode,
  } from "react";
  import { Savings } from "../interfaces/interfaces";
  import {
    createSavingsAPI,
    deleteSavingsAPI,
    updateSavingsAPI,
    getSavingsAPI,
  } from "../api";
  import { toast } from "react-toastify";
  import { useAuth } from "./authContext";
  
  type SavingsContextType = {
    savings: Savings[] | null;
    fetchSavings: () => Promise<void>;
    createSavings: (
      title: string,
      goalAmount: number,
      currentAmount: number
    ) => Promise<void>;
    deleteSavings: (savingID: number) => Promise<void>;
    updateSavings: (
      title: string,
      goalAmount: number,
      currentAmount: number,
      savingID: number
    ) => Promise<void>;
  };
  
  type Props = {
    children: ReactNode;
  };
  
  const SavingsContext = createContext<SavingsContextType | undefined>(undefined);
  
  export const useSavings = () => {
    const context = useContext(SavingsContext);
    if (!context) {
      throw new Error("useSavings must be used within a SavingsProvider");
    }
    return context;
  };
  
  export const SavingsProvider = ({ children }: Props) => {
    const [savings, setSavings] = useState<Savings[] | null>(null);
    const { token } = useAuth();
  
    const fetchSavings = async () => {
      if (!token) return;
      try {
        const savingsData = await getSavingsAPI(token);
        if (savingsData) setSavings(savingsData);
      } catch (err) {
        toast.error("Failed to fetch savings.");
      }
    };
  
    const createSavings = async (
      title: string,
      goalAmount: number,
      currentAmount: number
    ) => {
      if (!token) return;
      try {
        const saving = await createSavingsAPI(
          token,
          title,
          goalAmount,
          currentAmount
        );
        if (saving) {
          await fetchSavings();
          toast.success("Savings added!");
        }
      } catch (err) {
        toast.error("Could not create savings.");
      }
    };
  
    const deleteSavings = async (savingID: number) => {
      if (!token) return;
      try {
        await deleteSavingsAPI(token, savingID);
        await fetchSavings();
        toast.success("Savings deleted.");
      } catch (err) {
        toast.error("Could not delete savings.");
      }
    };
  
    const updateSavings = useCallback(
      async (
        title: string,
        goalAmount: number,
        currentAmount: number,
        savingID: number
      ) => {
        if (!token) return;
        try {
          await updateSavingsAPI(token, title, goalAmount, currentAmount, savingID);
          await fetchSavings();
          toast.success("Savings updated.");
        } catch (err) {
          toast.error("Could not update savings.");
        }
      },
      [token, fetchSavings]
    );
  
    useEffect(() => {
      if (token) {
        fetchSavings();
      }
    }, []);
  
    return (
      <SavingsContext.Provider
        value={{ savings, fetchSavings, createSavings, deleteSavings, updateSavings }}
      >
        {children}
      </SavingsContext.Provider>
    );
  };
  