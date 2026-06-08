import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";


export default function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        const verifyToken = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setIsValid(false);
                return;
            }

            try {

                const res = await axios.get(
                    "https://my-portfolio-backend-2026.onrender.com/admin/verify-token",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (res.data.status) {
                    // console.log(res.data);
                    setIsValid(res.data.status);
                }


            } catch (error) {

                localStorage.removeItem("token");
                setIsValid(false);

            }
        };

        verifyToken();

    }, []);

    if (isValid === null) {
        return (
            <div className="max-w-full min-h-screen flex justify-center items-center bg-black">
                <div class="sm:w-15 sm:h-15 w-8 h-8  rounded-full animate-spin
                    sm:border-7 border-5 border-solid border-white border-t-transparent"></div>
            </div>
        );
    }

    return isValid
        ? children
        : <Navigate to="/" replace />;
}