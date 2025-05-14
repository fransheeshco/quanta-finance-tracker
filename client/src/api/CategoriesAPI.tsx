import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
  Categories, GetCategoriesResponse, 
} from "../interfaces/interfaces";
import { GetCategoriesOptions } from "@/interfaces/QueryOptions";

const api = 'https://quanta-finance-tracker-backend.onrender.com/';



export const createCategoryAPI = async (categoryName: string, token: string) => {
    try {
      const data = await axios.post<Categories>(
        `${api}api/auth/category/postcategories`,
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
    options: GetCategoriesOptions = {}
  ): Promise<GetCategoriesResponse | undefined> => { // Return the full response type
    const { token, sortField = "categoryID", sortBy = "asc", page = 1, categoryID } = options;
  
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    if (categoryID) queryParams.append("categoryID", categoryID.toString());
    if (sortField) queryParams.append("sortField", sortField);
    if (sortBy) queryParams.append("sortBy", sortBy);
  
    try {
      const response = await axios.get<GetCategoriesResponse>(`${api}api/auth/category/getcategories?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      return undefined; 
    }
  };
  
  
  export const updateCategoryAPI = async (categoryName: string, categoryID: number, token: string) => {
    try {
      const data = await axios.patch<Categories>(
        `${api}api/auth/category/updatecategory/${categoryID}`,
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
        `${api}api/auth/category/deletecategory/${categoryID}`,
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