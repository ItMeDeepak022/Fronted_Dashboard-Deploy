import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  User,
  FileText,
  Cpu,
  Briefcase,
  FolderKanban,
  Award,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Eye,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const closeMobileSidebar = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Fletter');
    closeMobileSidebar();
    navigate('/');
  };

  const navItems = [
    { name: 'Profile', path: 'profile', icon: User, color: 'text-sky-500' },
    { name: 'Resume', path: 'resume', icon: FileText, color: 'text-violet-500' },
    { name: 'Skills', path: 'skills', icon: Cpu, color: 'text-emerald-500' },
    { name: 'Internship', path: 'internship', icon: Briefcase, color: 'text-amber-500' },
    { name: 'Projects', path: 'projects', icon: FolderKanban, color: 'text-blue-500' },
    { name: 'Certificates', path: 'certificates', icon: Award, color: 'text-rose-500' },
  ];

  const isDashboardActive = location.pathname === '/dashboard';

  // Navigation content reusable for both Mobile Drawer & Desktop Persistent Sidebar
  const NavigationContent = () => (
    <div className="flex flex-col h-full justify-between ">
      <div className="space-y-5">
        {/* Brand / Logo */}
        <div className="w-full flex items-center justify-between border-b border-slate-100">
          <div className="w-full flex justify-center items-center gap-3  h-15">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <h2 className="font-black text-slate-800 text-base leading-tight">Admin Dashboard</h2>
          </div>

          {/* Close button inside mobile drawer */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="space-y-1 p-3">
          <Link
            to="/dashboard"
            onClick={closeMobileSidebar}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isDashboardActive
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </Link>

          <div className="pt-3 pb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
              Portfolio Modules
            </span>
          </div>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isOpenState = openDropdown === item.name;
            const isPathActive = location.pathname.includes(`/${item.path}`);

            return (
              <div key={index} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isPathActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                    <span>{item.name}</span>
                  </div>
                  {isOpenState ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 transition-transform shrink-0" />
                  )}
                </button>

                {/* Submenu with Add and View */}
                {isOpenState && (
                  <div className="ml-4 pl-3 py-1 space-y-1 border-l-2 border-indigo-200 bg-slate-50/60 rounded-r-xl">
                    <Link
                      to={`/${item.path}/add`}
                      onClick={closeMobileSidebar}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>Add New</span>
                    </Link>
                    <Link
                      to={`/${item.path}/view`}
                      onClick={closeMobileSidebar}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>View All</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout Action at Bottom */}
      <div className="pt-3.5 border-t border-slate-100 pb-3.5 ">
        <button
          type="button"
          onClick={logout}
          className="mx-auto w-[70%] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-white" />
          <span className='text-white'>Logout Account</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Mobile / Tablet Backdrop Overlay (< lg) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* 2. Mobile / Tablet Drawer (< lg, Slides in from Left) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white  flex flex-col lg:hidden transition-transform duration-300 ease-out border-r border-slate-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <NavigationContent />
      </aside>

      {/* 3. Desktop Persistent Sidebar (>= lg, Grid Column 1) */}
      <aside className="hidden lg:flex flex-col w-full h-screen sticky top-0 bg-white border-r border-slate-200 shadow-xs z-20 overflow-y-auto">
        <NavigationContent />
      </aside>
    </>
  );
}
