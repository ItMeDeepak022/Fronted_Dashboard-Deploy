import React from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Bell } from 'lucide-react';

export default function Header() {
    // Admin Name strictly Deepak Kushwaha (not email)
    const adminName = "Deepak Kushwaha";

    return (
        <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md text-black md:border-l border-b border-gray-200/80 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 sm:py-3">
                <div className="flex items-center justify-between">
                    {/* Left: Admin Name Branding */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden text-sm text-white font-bold md:w-12 md:h-12 bg-[#E3EDFE] rounded-[50%] md:flex items-center justify-center shadow-xs">
                            <span className="text-[#305BFF]">DK</span>
                        </div>
                        <MdAdminPanelSettings className="w-10 h-10 text-slate-800 md:hidden flex justify-center" />
                        <div>
                            <h1 className="md:text-xl text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                                {adminName}
                            </h1>
                            <p className="text-[11px] text-slate-400 hidden sm:block">Portfolio Administrator</p>
                        </div>
                    </div>

                    {/* Right: Profile Badge & Actions */}
                    {/* pr-12 on mobile to avoid overlapping with hamburger menu */}
                    <div className="flex items-center gap-3 pr-12 md:pr-0">
                        {/* Notification Bell */}
                        <button
                            className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500 hover:text-slate-800 cursor-pointer hidden sm:block"
                            aria-label="Notifications"
                        >
                            <Bell className="w-4.5 h-4.5" />
                        </button>


                    </div>
                </div>
            </div>
        </header>
    );
}
