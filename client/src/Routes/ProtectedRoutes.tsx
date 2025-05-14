import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { token } = useAuth();
    return (token) ? (
        <>
            {children}</>) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute