import axios from "axios";
import { handleError } from "./ErrorHandler";
import {
  UserToken
} from "./interfaces/interfaces";

const api = 'http://localhost:8000/';

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post < UserToken > (`${api}api/auth/login`, {
      email: email,
      password: password,
    });
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (fname: string, lname: string, email: string, password: string) => {
  try {
    const data = await axios.post < UserToken > (`${api}api/auth/signup`, {
      fname,
      lname,
      email,
      password
    });
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400 && error.response.data.message === "Too weak") {
      throw error;
    } else {
      handleError(error);
      throw error;
    }
  }
};