import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setIsValid(false);
            return;
        }

        let timer;

        const verifyToken = async () => {

            try {

                // 1. ACTUAL BACKEND TOKEN VERIFICATION
                const res = await axios.get(
                    // "http://localhost:8000/admin/verify-token", for localserver test

                    "https://my-portfolio-backend-2026.onrender.com/admin/verify-token",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.data.status) {
                    localStorage.clear();

                    toast.error(
                        res.data.message || "Invalid session",
                        {
                            position: "bottom-center",
                            autoClose: 3000
                        }
                    );

                    setIsValid(false);
                    return;
                }

                // 2. TOKEN PAYLOAD SE EXP NIKALO
                const payload = JSON.parse(
                    atob(token.split(".")[1])
                );

                const expiryTime = payload.exp * 1000; 
              
                const remainingTime = expiryTime - Date.now();

                console.log(
                    "Token expires in:",
                    Math.floor(remainingTime / 1000),
                    "seconds"
                );

                if (remainingTime <= 0) {

                    localStorage.clear()

                    toast.error(
                        "Session expired. Please login again.",
                        {
                            position: "bottom-center",
                            autoClose: 3000
                        }
                    );

                    setIsValid(false);
                    return;
                }

                // 3. TOKEN VALID
                setIsValid(true);

                // 4. EXPIRATION TIMER
                timer = setTimeout(() => {

                    localStorage.clear();

                    toast.error(
                        "Session expired. Please login again.",
                        {
                            position: "bottom-center",
                            autoClose: 3000
                        }
                    );

                    setIsValid(false);

                }, remainingTime);

            } catch (error) {

                console.log(
                    "Verify token error:",
                    error.response?.data
                );

                localStorage.removeItem("token");

                toast.error(
                    error.response?.data?.message ||
                    "Invalid or expired session",
                    {
                        position: "bottom-center",
                        autoClose: 3000
                    }
                );

                setIsValid(false);
            }
        };

        verifyToken();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };

    }, []);


    // Checking token
    if (isValid === null) {
        return null;
    }


    // Invalid / expired
    if (!isValid) {
        return <Navigate to="/" replace />;
    }


    // Valid
    return children;
}