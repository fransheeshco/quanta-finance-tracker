import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
     Savings, GetSavingsResponse,
} from "../interfaces/interfaces"
import { GetSavingsOptions } from "@/interfaces/QueryOptions";
const api = "http://localhost:8000/api/";

export const createSavingsAPI = async (
    token: string,
    title: string,
    goalAmount: number,
    currentAmount: number
  ) => {
    try {
      const { data } = await axios.post<Savings>(
        `${api}auth/savings/addsavings`,
        { title, goalAmount, currentAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  
  export const updateSavingsAPI = async (
    token: string,
    title: string,
    goalAmount: number,
    currentAmount: number,
    savingID: number
  ) => {
    try {
      const { data } = await axios.patch<Savings>(
        `${api}auth/savings/updatesavings/${savingID}`,
        { title, goalAmount, currentAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteSavingsAPI = async (token: string, savingID: number) => {
    try {
      const { data } = await axios.delete(
        `${api}auth/savings/deletesavings/${savingID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  
  export const getSavingsAPI = async ({
    token,
    limit = 5,
    sortField = "title",
    sortBy = "asc",
    page = 1,
  }: GetSavingsOptions): Promise<GetSavingsResponse> => {
    try {
      const params = {
        limit,
        sortField,
        sortBy,
        page,
      };
  
      const data = await axios.get<GetSavingsResponse>(
        `${api}auth/savings/getsavings`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );
  
      // Return the savings object as received from the backend
      return data.data;
    } catch (error) {
      handleError(error);
      // Return fallback data structure matching GetSavingsResponse
      return { savings: { count: 0, rows: [] } };
    }
  };
  