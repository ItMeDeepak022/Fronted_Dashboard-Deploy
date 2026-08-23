import React from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  UserCheck,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router';

export default function Header({ onMenuToggle, sidebarOpen }) {
  const fletter = localStorage.getItem('Fletter') || 'A';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md text-slate-800 shadow-xs border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Mobile Menu Button & Brand Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            {/* Mobile / Tablet Menu Toggle (< lg) */}
            <button
              type="button"
              onClick={onMenuToggle}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-indigo-600 lg:hidden transition cursor-pointer shrink-0"
              aria-label="Toggle Sidebar Navigation"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-rose-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Brand Logo Icon */}
            <div className="hidden  flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white shrink-0 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>

            
          </div>

          {/* Right: Overview link, Notifications, Admin Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Quick Overview Link (Desktop) */}
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Overview
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                type="button"
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>
            </div>

            {/* Admin Avatar Pill */}
            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs uppercase">
                {fletter}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">Admin User</div>
                <div className="text-[10px] text-slate-400">Super Administrator</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
