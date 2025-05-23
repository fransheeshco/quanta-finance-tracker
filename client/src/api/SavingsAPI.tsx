import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
  Savings, GetSavingsResponse,
} from "../interfaces/interfaces"
import { GetSavingsOptions } from "@/interfaces/QueryOptions";

const api = 'https://quanta-finance-tracker-backend.onrender.com/';



export const createSavingsAPI = async (
  token: string,
  title: string,
  goalAmount: number,
  currentAmount: number
) => {
  try {
    const { data } = await axios.post<Savings>(
      `${api}api/auth/savings/addsavings`,
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
      `${api}api/auth/savings/updatesavings/${savingID}`,
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
      `${api}api/auth/savings/deletesavings/${savingID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSavingsAPI = async ({
  limit = 5,
  sortField = "title",
  sortBy = "asc",
  page = 1,
}: GetSavingsOptions) => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append('sortField', sortField);
  queryParams.append('sortBy', sortBy);

  const token = localStorage.getItem('token');

  try {
    const response = await axios.get<GetSavingsResponse>(
      `${api}api/auth/savings/getsavings?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { savings, count, page: currentPage, totalPages, nextPage } = response.data;

    return {
      savings: {
        rows: savings,
        count,
      },
      page: currentPage,
      totalPages,
      nextPage,
    };
  } catch (error) {
    console.error("Failed to fetch savings:", error);
  }
};
