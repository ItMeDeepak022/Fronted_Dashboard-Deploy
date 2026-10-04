import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {
    FolderGit2,
    Code2,
    BriefcaseBusiness,
    Award,
    User,
    FileText,
    ArrowRight,
    RefreshCw,
    Sun,
    SunMedium,
    Moon,
    Calendar
} from 'lucide-react';
import { toast } from 'react-toastify';

import CurveChart from '../components/charts/CurveChart';
import XYChart from '../components/charts/XYChart';

// Helper to determine if user session is actively valid and not expired
const isSessionValid = () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return false;
        if (sessionStorage.getItem("session_expired") === "true") return false;

        const parts = token.split(".");
        if (parts.length < 2) return false;

        const payload = JSON.parse(atob(parts[1]));
        if (payload?.exp && payload.exp * 1000 <= Date.now()) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

export default function Dashboard() {
    // Dynamic counts from API with safe defaults
    const [counts, setCounts] = useState({
        projects: 9,
        skills: 15,
        internships: 2,
        certificates: 4,
    });

    const [liveData, setLiveData] = useState({
        projects: [],
        skills: [],
        internships: [],
        certificates: [],
    });

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState('Just now');

    const isMountedRef = useRef(true);
    const fetchIdRef = useRef(0);

    // Admin Name strictly Deepak Kushwaha
    const adminName = "Deepak Kushwaha";

    // Greeting according to local time of day
    const getGreetingInfo = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return {
                greeting: "Good Morning",
                sub: "Ready to review and update your portfolio today?",
                icon: Sun,
                iconColor: "text-amber-600",
                iconBg: "bg-amber-50",
                iconBorder: "border-amber-200/80",
            };
        } else if (hour >= 12 && hour < 17) {
            return {
                greeting: "Good Afternoon",
                sub: "Here is your latest portfolio performance and content summary.",
                icon: SunMedium,
                iconColor: "text-blue-600",
                iconBg: "bg-blue-50",
                iconBorder: "border-blue-200/80",
            };
        } else if (hour >= 17 && hour < 22) {
            return {
                greeting: "Good Evening",
                sub: "Wrapping up today's work? Check your live projects and stats.",
                icon: Moon,
                iconColor: "text-purple-600",
                iconBg: "bg-purple-50",
                iconBorder: "border-purple-200/80",
            };
        } else {
            return {
                greeting: "Working Late",
                sub: "Here is your portfolio control summary. Make sure to rest well!",
                icon: Moon,
                iconColor: "text-indigo-600",
                iconBg: "bg-indigo-50",
                iconBorder: "border-indigo-200/80",
            };
        }
    };

    const greetingInfo = getGreetingInfo();
    const GreetingIcon = greetingInfo.icon;

    const todayDateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    // Central function to fetch live API counts and data
    const fetchLiveStats = async (showToast = false) => {
        // If not logged in or session expired, exit immediately and never show toast
        if (!isMountedRef.current || !isSessionValid()) return;

        const currentFetchId = ++fetchIdRef.current;
        setIsRefreshing(true);
        try {
            const [projRes, skillRes, internRes, certRes] = await Promise.allSettled([
                axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-project'),
                axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-skills'),
                axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-intern'),
                axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-certificate'),
            ]);

            // If session expired, unmounted, or a newer fetch started, exit immediately without showing toast
            if (
                !isMountedRef.current ||
                currentFetchId !== fetchIdRef.current ||
                !isSessionValid()
            ) {
                return;
            }

            // Helper to extract array safely
            const extractArray = (res) => {
                if (res?.status === 'fulfilled') {
                    const d = res.value?.data?.data !== undefined ? res.value.data.data : res.value?.data;
                    if (Array.isArray(d)) return d;
                }
                return null;
            };

            const projArr = extractArray(projRes);
            const skillArr = extractArray(skillRes);
            const internArr = extractArray(internRes);
            const certArr = extractArray(certRes);

            setCounts({
                projects: projArr ? projArr.length : 9,
                skills: skillArr ? skillArr.length : 15,
                internships: internArr ? internArr.length : 2,
                certificates: certArr ? certArr.length : 4,
            });

            setLiveData({
                projects: projArr || [],
                skills: skillArr || [],
                internships: internArr || [],
                certificates: certArr || [],
            });

            const now = new Date();
            setLastSyncTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);

            // Only show toast if user is still actively logged in and session is verified valid
            if (
                showToast &&
                isMountedRef.current &&
                currentFetchId === fetchIdRef.current &&
                isSessionValid()
            ) {
                toast.success('Live Projects & Internships data refreshed!', {
                    position: 'top-left',
                });
            }
        } catch (error) {
            console.log('Error refreshing data:', error);
            if (
                !isMountedRef.current ||
                currentFetchId !== fetchIdRef.current ||
                !isSessionValid()
            ) {
                return;
            }

            const isAuthError =
                error.response?.status === 401 ||
                error.response?.data?.message?.toLowerCase().includes('session') ||
                error.response?.data?.message?.toLowerCase().includes('token');

            if (showToast && !isAuthError && isSessionValid()) {
                toast.error('Failed to sync with live backend', {
                    position: 'top-left',
                });
            }
        } finally {
            if (isMountedRef.current && currentFetchId === fetchIdRef.current) {
                setIsRefreshing(false);
            }
        }
    };

    useEffect(() => {
        isMountedRef.current = true;
        fetchLiveStats(false);

        // Listen for session logout/expired event to immediately cancel pending toast & fetch
        const handleSessionEnd = () => {
            fetchIdRef.current += 1;
            setIsRefreshing(false);
            toast.dismiss();
        };

        window.addEventListener('session_logout', handleSessionEnd);

        return () => {
            isMountedRef.current = false;
            fetchIdRef.current += 1;
            window.removeEventListener('session_logout', handleSessionEnd);
            toast.dismiss();
        };
    }, []);

    // 4 Main Dashboard Cards
    const cards = [
        {
            title: 'Projects',
            count: counts.projects,
            desc: 'View and manage all projects',
            link: '/projects/view',
            icon: FolderGit2,
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50/80',
            borderColor: 'border-blue-200/70',
            hoverBorder: 'hover:border-blue-300',
                    },
        {
            title: 'Skills',
            count: counts.skills,
            desc: 'Showcase your technical skills',
            link: '/skills/view',
            icon: Code2,
            iconColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50/80',
            borderColor: 'border-emerald-200/70',
            hoverBorder: 'hover:border-emerald-300',
            
        },
        {
            title: 'Internships',
            count: counts.internships,
            desc: 'Manage your work experience',
            link: '/internship/view',
            icon: BriefcaseBusiness,
            iconColor: 'text-purple-600',
            bgColor: 'bg-purple-50/80',
            borderColor: 'border-purple-200/70',
            hoverBorder: 'hover:border-purple-300',
            
        },
        {
            title: 'Certificates',
            count: counts.certificates,
            desc: 'Certifications and achievements',
            link: '/certificates/view',
            icon: Award,
            iconColor: 'text-amber-600',
            bgColor: 'bg-amber-50/80',
            borderColor: 'border-amber-200/70',
            hoverBorder: 'hover:border-amber-300',
            
        },
    ];

    // Quick access modules
    const modules = [
        { title: 'Profile', desc: 'Personal info', link: '/profile/view', icon: User },
        { title: 'Resume', desc: 'Upload resume', link: '/resume/view', icon: FileText },
        { title: 'Skills', desc: 'Technical skills', link: '/skills/view', icon: Code2 },
        { title: 'Internship', desc: 'Experience', link: '/internship/view', icon: BriefcaseBusiness },
        { title: 'Projects', desc: 'Showcase work', link: '/projects/view', icon: FolderGit2 },
        { title: 'Certificates', desc: 'Certifications', link: '/certificates/view', icon: Award },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* ================= AWESOME GREETING BANNER WITH TIME-BASED GREETING & ADMIN NAME ================= */}
                <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
                    {/* Subtle Ambient Glows */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
                        {/* Mobile Top Bar: Icon, Live System Pulse & Date (Mobile only) */}
                        <div className="flex md:hidden items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className={`w-9 h-9 rounded-xl ${greetingInfo.iconBg} ${greetingInfo.iconBorder} border flex items-center justify-center shrink-0 shadow-2xs`}>
                                    <GreetingIcon className={`w-4.5 h-4.5 ${greetingInfo.iconColor}`} />
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Live System
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-medium shadow-2xs">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                <span>{todayDateStr}</span>
                            </div>
                        </div>

                        {/* Main Greeting Content Block */}
                        <div className="flex items-start md:items-center gap-3.5">
                            {/* Desktop Icon Box (hidden on mobile, visible on md+) */}
                            <div className={`hidden md:flex w-12 h-12 rounded-2xl ${greetingInfo.iconBg} ${greetingInfo.iconBorder} border items-center justify-center shrink-0 shadow-xs`}>
                                <GreetingIcon className={`w-6 h-6 ${greetingInfo.iconColor}`} />
                            </div>

                            <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                        {greetingInfo.greeting},{' '}
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {adminName}
                                        </span>
                                    </h1>
                                    {/* Desktop Status Badge */}
                                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Live System
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                                    {greetingInfo.sub}
                                </p>
                            </div>
                        </div>

                        {/* Actions Row: Date (desktop) & Live Refresh Button */}
                        <div className="flex items-center justify-between md:justify-end gap-2.5 pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100">
                            {/* Mobile sync indicator */}
                            <div className="flex  items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span>Synced: {lastSyncTime}</span>
                            </div>

                            {/* Desktop Date badge */}
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium shadow-2xs">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{todayDateStr}</span>
                            </div>

                            {/* Refresh Button */}
                            <button
                                onClick={() => fetchLiveStats(true)}
                                disabled={isRefreshing}
                                className="inline-flex items-center gap-2 bg-[#F8FAFC] hover:bg-slate-100 active:scale-95 text-slate-700 text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-xl transition-all border border-slate-200/90 shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-60"
                                title="Live fetch Projects, Internships, Skills and Certificates"
                            >
                                <RefreshCw size={13} className={`text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= 4 CARDS ================= */}
                {/* Responsive grid: 1 col (mobile), 2 cols (tablet), 4 cols (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {cards.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link key={index} to={item.link} className="block group">
                                <div
                                    className={`relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 ${item.hoverBorder} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full overflow-hidden`}
                                >
                                    {/* Subtle Top Accent Glow on Hover */}
                                    <div
                                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r  opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    />

                                    {/* Top Row: Icon (Left) + View Button (Right) */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-transform duration-200`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-blue-600 bg-slate-50 group-hover:bg-blue-50 px-3 py-1 rounded-full border border-slate-200/70 group-hover:border-blue-200 transition-all duration-200">
                                            View
                                            <ArrowRight
                                                size={13}
                                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                                            />
                                        </span>
                                    </div>

                                    {/* Middle Section: Big Number & Title */}
                                    <div>
                                        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-1.5">
                                            {item.count}
                                        </div>
                                        <h2 className="text-base font-bold text-slate-800 tracking-tight">
                                            {item.title}
                                        </h2>
                                    </div>

                                    {/* Bottom Section: Description with divider */}
                                    <div className="pt-3 mt-3 border-t border-slate-100">
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* ================= 2 GRAPHS: 1 PROJECT DIV & 1 INTERNSHIP DIV ================= */}
                {/* Fully Responsive: 1 col on mobile & tablet, 2 cols on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                    {/* Div 1: Project Curve Graph */}
                    <div className="w-full">
                        <CurveChart
                            totalProjects={counts.projects}
                            projectsList={liveData.projects}
                        />
                    </div>

                    {/* Div 2: Internship XY Graph */}
                    <div className="w-full">
                        <XYChart
                            totalInternships={counts.internships}
                            internshipsList={liveData.internships}
                        />
                    </div>
                </div>

                {/* ================= QUICK NAVIGATION ================= */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Quick Navigation</h2>
                            <p className="text-xs text-slate-500">Access and edit all portfolio sections</p>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">6 Modules</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {modules.map((m, idx) => {
                            const MIcon = m.icon;
                            return (
                                <Link
                                    key={idx}
                                    to={m.link}
                                    className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 flex flex-col items-center text-center group bg-slate-50/50"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white shadow-2xs border border-slate-200/70 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:scale-105 transition-all mb-2">
                                        <MIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {m.title}
                                    </span>
                                    <span className="text-[11px] text-slate-400 mt-0.5">
                                        {m.desc}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
