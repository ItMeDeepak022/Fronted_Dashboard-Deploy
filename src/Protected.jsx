import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { ShieldAlert, Clock, LogIn } from "lucide-react";
import { broadcastAuthEvent, subscribeAuthEvents } from "./common/authSync";

export default function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const sessionExpiredRef = useRef(false);
    const isVerifyingRef = useRef(false);
    const timerRef = useRef(null);

    // Trigger session expired state with top-center toast & modal
    const handleSessionExpired = (message = "Session expired. Please login again.") => {
        // Prevent duplicate trigger if already in session expired state
        if (sessionExpiredRef.current) return;
        sessionExpiredRef.current = true;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Set flag so all background components know session is over
        sessionStorage.setItem("session_expired", "true");
        window.dispatchEvent(new Event("session_logout"));

        // 1. Immediately dismiss all existing toasts (e.g. refresh toasts)
        toast.dismiss();

        localStorage.clear();

        // 2. Broadcast to any other open tabs in the same browser
        broadcastAuthEvent({
            type: "SESSION_EXPIRED",
            message: message,
        });

        // 3. Show Toast on top in center
        toast.error(message, {
            position: "top-center",
            autoClose: 3500,
        });

        // 4. Show normal & professional session timeout popup
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

        // Check local token expiry timestamp first
        try {
            const parts = token.split(".");
            if (parts.length >= 2) {
                const payload = JSON.parse(atob(parts[1]));
                const expiryTime = payload.exp * 1000;
                const remainingTime = expiryTime - Date.now();

                if (remainingTime <= 0) {
                    handleSessionExpired("Session expired. Please login again.");
                    return;
                }

                // Local JWT expiration timer
                timerRef.current = setTimeout(() => {
                    handleSessionExpired("Session expired. Please login again.");
                }, remainingTime);
            }
        } catch (err) {
            console.warn("Invalid token format in localStorage:", err);
            handleSessionExpired("Invalid session token. Please login again.");
            return;
        }

        // Centralized token verification with backend
        const verifyToken = async (isBackground = false) => {
            if (sessionExpiredRef.current || isVerifyingRef.current) return;

            const currentToken = localStorage.getItem("token");
            if (!currentToken) {
                handleSessionExpired("Session ended. Please login again.");
                return;
            }

            isVerifyingRef.current = true;

            try {
                const res = await axios.get(
                    "https://my-portfolio-backend-2026.onrender.com/admin/verify-token",
                    {
                        headers: {
                            Authorization: `Bearer ${currentToken}`
                        },
                        timeout: 8000
                    }
                );

                if (!res.data || !res.data.status) {
                    handleSessionExpired(
                        res?.data?.message || "Session ended from another device. Please login again."
                    );
                    return;
                }

                // If initial verification passes, confirm valid
                if (!isBackground) {
                    setIsValid(true);
                }
            } catch (error) {
                console.log("Token verification response:", error.response?.status, error.response?.data);

                // If backend explicitly rejected with 401 / 403 or status: false
                const isRejectedByBackend =
                    error.response &&
                    (error.response.status === 401 ||
                     error.response.status === 403 ||
                     error.response.data?.status === false);

                if (isRejectedByBackend) {
                    handleSessionExpired(
                        error.response?.data?.message || "Session expired or logged out from another device."
                    );
                } else if (!isBackground) {
                    // On initial mount only, if request failed completely, report error
                    if (error.response?.status) {
                        handleSessionExpired(
                            error.response?.data?.message || "Session invalid or expired."
                        );
                    } else {
                        // Allow initial load if transient network offline, but verify locally
                        setIsValid(true);
                    }
                }
            } finally {
                isVerifyingRef.current = false;
            }
        };

        // 1. Initial verification on mount
        verifyToken(false);

        // 2. Real-time Cross-Device Heartbeat Polling (every 5 seconds)
        // This detects when another device logs out or logs in immediately without manual refresh!
        const heartbeatInterval = setInterval(() => {
            if (!sessionExpiredRef.current && !isVerifyingRef.current) {
                verifyToken(true);
            }
        }, 5000);

        // 3. Immediate check when window regains focus or tab becomes visible
        const handleWindowActivity = () => {
            if (
                document.visibilityState === "visible" &&
                !sessionExpiredRef.current &&
                !isVerifyingRef.current
            ) {
                verifyToken(true);
            }
        };

        document.addEventListener("visibilitychange", handleWindowActivity);
        window.addEventListener("focus", handleWindowActivity);

        // 4. Instant multi-tab synchronization via BroadcastChannel & storage events
        const unsubscribeAuth = subscribeAuthEvents((event) => {
            if (event.type === "AUTH_LOGOUT" || event.type === "SESSION_EXPIRED") {
                handleSessionExpired(
                    event.message || "Session ended from another tab/device. Please login again."
                );
            }
        });

        // 5. Global Axios Interceptor to catch 401/403 or unauthorized responses on any dashboard action
        const interceptorId = axios.interceptors.response.use(
            (response) => {
                if (
                    response.data &&
                    response.data.status === false &&
                    (response.data.message?.toLowerCase().includes("session") ||
                     response.data.message?.toLowerCase().includes("token") ||
                     response.data.message?.toLowerCase().includes("unauthorized") ||
                     response.data.message?.toLowerCase().includes("logged out"))
                ) {
                    handleSessionExpired(response.data.message);
                }
                return response;
            },
            (error) => {
                if (
                    error.response &&
                    (error.response.status === 401 || error.response.status === 403)
                ) {
                    const msg =
                        error.response.data?.message ||
                        "Session expired or logged out from another device.";
                    handleSessionExpired(msg);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            clearInterval(heartbeatInterval);
            if (timerRef.current) clearTimeout(timerRef.current);
            document.removeEventListener("visibilitychange", handleWindowActivity);
            window.removeEventListener("focus", handleWindowActivity);
            unsubscribeAuth();
            axios.interceptors.response.eject(interceptorId);
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
