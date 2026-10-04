import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { ShieldAlert, Clock, LogIn } from "lucide-react";

export default function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // Trigger session expired state with top-center toast & modal
    const handleSessionExpired = (message = "Session expired. Please login again.") => {
        // Set flag so all background components know session is over
        sessionStorage.setItem("session_expired", "true");
        window.dispatchEvent(new Event("session_logout"));

        // 1. Immediately dismiss all existing toasts (e.g. refresh toasts)
        toast.dismiss();

        localStorage.clear();

        // 2. Show Toast on top in center
        toast.error(message, {
            position: "top-center",
            autoClose: 3500,
        });

        // 3. Show normal & professional session timeout popup
        setSessionExpired(true);
        setCountdown(3);
    };

    // Countdown timer for automatic redirect after 3 seconds
    useEffect(() => {
        if (!sessionExpired) return;

        if (countdown <= 0) {
            toast.dismiss();
            setIsValid(false);
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [sessionExpired, countdown]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // If no token exists at all, redirect immediately without popup
        if (!token) {
            setIsValid(false);
            return;
        }

        let timer;

        const verifyToken = async () => {
            try {
                // 1. ACTUAL BACKEND TOKEN VERIFICATION
                const res = await axios.get(
                    "https://my-portfolio-backend-2026.onrender.com/admin/verify-token",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.data.status) {
                    handleSessionExpired(res.data.message || "Invalid session");
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
                    handleSessionExpired("Session expired. Please login again.");
                    return;
                }

                // 3. TOKEN VALID
                setIsValid(true);

                // 4. EXPIRATION TIMER
                timer = setTimeout(() => {
                    handleSessionExpired("Session expired. Please login again.");
                }, remainingTime);

            } catch (error) {
                console.log("Verify token error:", error.response?.data);
                handleSessionExpired(
                    error.response?.data?.message || "Invalid or expired session"
                );
            }
        };

        verifyToken();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    // Manual immediate redirect when clicking Login Now button
    const handleLoginNow = () => {
        toast.dismiss();
        setIsValid(false);
    };

    // Checking token
    if (isValid === null && !sessionExpired) {
        return null;
    }

    // Invalid / expired and countdown completed
    if (isValid === false) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {/* ================= NORMAL & PROFESSIONAL SESSION LOGOUT POPUP ================= */}
            {sessionExpired && (
                <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 max-w-sm w-full p-6 sm:p-7 text-center relative overflow-hidden transition-all duration-200">
                         

                        {/* Professional Shield / Alert Icon */}
                        <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
                            <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                            Session Expired
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 max-w-[280px] mx-auto">
                            Your admin session has ended for your security. Please log in again to continue accessing your dashboard.
                        </p>

                        {/* Countdown & Progress bar status box */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4.5 text-left">
                            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                                <span className="flex items-center gap-1.5 font-medium text-[12px]">
                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                    Auto-redirecting
                                </span>
                                <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs text-[11px]">
                                    {countdown}s
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-linear"
                                    style={{ width: `${Math.max(0, (countdown / 3) * 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Log In Again Button */}
                        <button
                            onClick={handleLoginNow}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Log In Again</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Protected Content - frozen & disabled when session is expired */}
            <div className={sessionExpired ? "pointer-events-none select-none filter blur-[1px]" : ""}>
                {children}
            </div>
        </>
    );
}
