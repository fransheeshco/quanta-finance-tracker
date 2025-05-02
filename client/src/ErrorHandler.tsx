import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;  // Define err here to access within scope

        if (Array.isArray(err?.data.errors)) {
            for (let val of err?.data.errors) {
                toast.warning(val.description);
            }
        } else if (typeof err?.data.errors === "object") {
            for (let e in err.data.errors) {
                toast.warning(err.data.errors[e][0]);  // Fixed typo (errors instead of erorrs)
            }
        }
    } else if (error?.data) {
        toast.warning(error?.data);
    } else if (error?.status === 401) {
        toast.warning("Please Login");
        window.history.pushState({}, "LoginPage", "/login");
    } else if (error) {
        toast.warning(error?.data);
    }
};
