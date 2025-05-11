import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
  Categories, GetCategoriesResponse, 
} from "../interfaces/interfaces";

const api = "http://localhost:8000/api/";

export const createCategoryAPI = async (categoryName: string, token: string) => {
    try {
      const data = await axios.post<Categories>(
        `${api}auth/category/postcategories`,
        {
          categoryName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export const getCategoriesAPI = async (
    { token, sortField = "categoryID", sortBy = "asc", page = 1 }: {
      token: string;
      sortField?: string;
      sortBy?: "asc" | "desc";
      page?: number;
    }
  ): Promise<Categories[]> => {
    try {
      const response = await axios.get<GetCategoriesResponse>(`${api}auth/category/getcategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sortField,
          sortBy,
          page,
        },
      });
      return response.data.categories.rows; // Use 'rows' to get the actual categories
    } catch (error) {
      handleError(error);
      return []; // Return an empty array in case of error
    }
  };
  
  
  export const updateCategoryAPI = async (categoryName: string, categoryID: number, token: string) => {
    try {
      const data = await axios.patch<Categories>(
        `${api}auth/category/updatecategory/${categoryID}`,
        {
          categoryName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export const deleteCategoryAPI = async (categoryID: number, token: string) => {
    try {
      const data = await axios.delete<Categories>(
        `${api}auth/category/deletecategory/${categoryID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }