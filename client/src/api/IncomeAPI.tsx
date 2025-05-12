import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
    Categories, Income, GetIncomeResponse,
} from "../interfaces/interfaces";
import { GetIncomeOptions } from "@/interfaces/QueryOptions";

const api = "http://localhost:8000/api/";

export const createIncomeAPI = async (amount: number, date: Date, token: string) => {
    try {
        const data = await axios.post<Income>(
            `${api}income/addincome`,
            {
                amount,
                date: date.toISOString().split('T')[0],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return data.data;
    } catch (error) {
        handleError(error);
    }
}

export const getIncomesAPI = async (options: GetIncomeOptions = {}): Promise<GetIncomeResponse | undefined> => {
    const {
        page = 1,
        incomeID,
        sortField = "amount",
        sortBy = "desc",
    } = options;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    if (incomeID) queryParams.append("categoryID", incomeID.toString());
    if (sortField) queryParams.append("sortField", sortField);
    if (sortBy) queryParams.append("sortBy", sortBy);
    
    const token = localStorage.getItem("token");

    try {
        const data = await axios.get<GetIncomeResponse>(
            `${api}income/getincomes?${queryParams}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log( "adskjsdad ", data);
        return {
            message: data.data.message,
            income: {
                count: data.data.income.count,
                rows: data.data.income.rows
            }
        }
    } catch (error) {
        handleError(error);
        console.error("Error fetching incomes:", error);
    }
};


export const deleteIncomeAPI = async (incomeID: number, token: string) => {
    try {
        const data = await axios.patch<Categories>(
            `${api}income/deleteincome/${incomeID}`,
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

export const updateIncomeAPI = async (token: string, amount: number, incomeID: number) => {
    try {
        const data = await axios.patch<Income>(
            `${api}income/updateincome/${incomeID}`,
            {
                amount
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
