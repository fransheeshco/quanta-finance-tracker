import React, { createContext, useEffect, useState, useContext, ReactNode, useCallback } from "react";
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
  currentPage: number;
  totalPages: number;
  fetchSavings: (options?: GetSavingsOptions) => Promise<Savings[] | null | undefined>;
  createSavings: (title: string, goalAmount: number, currentAmount: number) => Promise<void>;
  deleteSavings: (savingID: number) => Promise<void>;
  updateSavings: (savingID: number, title: string, goalAmount: number, currentAmount: number) => Promise<void>;
  setCurrentPage: (page: number) => void;  
};

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const SavingsProvider = ({ children }: Props) => {
  const [savings, setSavings] = useState<Savings[] | undefined>(undefined);
  const [savingsCount, setSavingsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("Initial currentPage:", currentPage);


  const { token } = useAuth();

  const fetchSavings = useCallback(async (options: GetSavingsOptions = {}) => {
    if (!token) {
        toast.error("Token is missing.");
        return;
    }

    try {
        const response = await getSavingsAPI(options);
        if (!options.limit) return;
        if (response) {
            setSavings(response.savings.rows);
            setSavingsCount(response.savings.count);
            console.log("API Response Page:", response.page);
            setCurrentPage(response.page);
            console.log("currpage: ", currentPage)
            setTotalPages(response.totalPages);
            console.log("total page", totalPages)
            console.log("API Response:", response);
            console.log("API Response Data:", response.savings);
        }
        return response?.savings.rows;
    } catch (error) {
        console.error("Error fetching savings:", error);
        toast.error("Error fetching savings");
        return null;
    }
}, [token]);
  


  const createSavings = async (title: string, goalAmount: number, currentAmount: number) => {
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

  const updateSavings = async (savingID: number, title: string, goalAmount: number, currentAmount: number) => {
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
      fetchSavings(); // options is undefined here
    }
  }, [token, fetchSavings]);  

  console.log("Fetched savings:", savings);
console.log("Total savings count:", savingsCount);
console.log("Current page:", currentPage);
console.log("Total pages:", totalPages);


  return (
    <SavingsContext.Provider
      value={{
        savings,
        savingsCount,
        currentPage,
        totalPages,
        fetchSavings,
        createSavings,
        deleteSavings,
        updateSavings,
        setCurrentPage, 
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
