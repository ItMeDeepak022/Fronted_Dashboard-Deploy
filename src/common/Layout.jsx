import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../pages/Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] bg-slate-50 text-slate-800">
      {/* 1. Sidebar Navigation Column */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 2. Main Content & Header/Footer Column */}
      <div className="flex flex-col min-w-full min-h-screen">
        {/* Sticky Header */}
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
