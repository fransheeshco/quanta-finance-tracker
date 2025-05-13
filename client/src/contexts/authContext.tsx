import { createContext, useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../api";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios"; // Import AxiosError

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (fname: string, lname: string, email: string, password: string) => Promise<string | void>; // Return type can be string (error) or void (success)
    loginUser: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
    registrationError: string | null; // Add state for registration error
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null); // Initialize registration error state

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            try {
                const parsedUser: User = JSON.parse(user);
                setUser(parsedUser);
                setToken(token);
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }

        setIsReady(true);

    }, []);

    const registerUser = async (
        fname: string,
        lname: string,
        email: string,
        password: string
    ): Promise<string | void> => {
        console.log("Registering with:", { fname, lname, email, password });
        setRegistrationError(null); // Clear any previous registration error

        try {
            const res = await registerAPI(fname, lname, email, password);
            if (res) {
                const userObj = {
                    userID: res.data.user.userID,
                    fname: res.data.user.fname,
                    email: res.data.user.email,
                };

                localStorage.setItem("token", res?.data.token);
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj);
                toast.success("Registration Success!");
                navigate("/home");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 400 && error.response?.data?.message === "Password is too weak.") {
                setRegistrationError(error.response.data.message);
                return error.response.data.message; // Return the error message to the component
            } else {
                toast.warning("Server error occurred during registration.");
                console.error("Registration error:", error);
                setRegistrationError("An unexpected error occurred during registration."); // Set a generic error message
                return "An unexpected error occurred during registration."; // Return a generic error
            }
        }
    };


    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password)
            .then((res) => {
                if (res) {
                    const userObj = {
                        userID: res.data.user.userID,
                        fname: res.data.user.fname,
                        email: res.data.user.email,
                    };

                    localStorage.setItem("token", res?.data.token);
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj);
                    toast.success("Login Success!");
                    navigate("/home");
                }
            })
            .catch((e: Error) => toast.warning(`Server error occurred ${e}`));
    };


    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser, registrationError }} // Include registrationError in the value
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);