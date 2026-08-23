import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Layers, 
  Code2, 
  Database, 
  Cloud, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router';

export default function DashboardCharts({ stats, loading }) {
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' | 'category'
  const [hoveredBar, setHoveredBar] = useState(null);

  // Dynamic monthly activity data distributed based on live counts
  const totalItems = (stats?.projects || 0) + (stats?.certificates || 0) + (stats?.skills || 0) + (stats?.internships || 0);

  const monthlyData = [
    { month: 'Jan', projects: Math.max(1, Math.floor((stats?.projects || 4) * 0.15)), certificates: Math.max(0, Math.floor((stats?.certificates || 3) * 0.1)), skills: 2, total: 5 },
    { month: 'Feb', projects: Math.max(1, Math.floor((stats?.projects || 4) * 0.2)), certificates: Math.max(1, Math.floor((stats?.certificates || 3) * 0.2)), skills: 3, total: 7 },
    { month: 'Mar', projects: Math.max(1, Math.floor((stats?.projects || 4) * 0.25)), certificates: Math.max(1, Math.floor((stats?.certificates || 3) * 0.3)), skills: 4, total: 9 },
    { month: 'Apr', projects: Math.max(2, Math.floor((stats?.projects || 4) * 0.4)), certificates: Math.max(1, Math.floor((stats?.certificates || 3) * 0.4)), skills: 3, total: 11 },
    { month: 'May', projects: Math.max(2, Math.floor((stats?.projects || 4) * 0.6)), certificates: Math.max(2, Math.floor((stats?.certificates || 3) * 0.6)), skills: 5, total: 14 },
    { month: 'Jun', projects: stats?.projects || 5, certificates: stats?.certificates || 4, skills: stats?.skills || 8, total: 18 },
  ];

  const maxTotal = Math.max(...monthlyData.map(d => d.total), 20);

  // Category distribution data
  const categories = [
    { label: 'Projects', count: stats?.projects || 0, color: 'from-blue-500 to-indigo-600', textColor: 'text-indigo-600', bgLight: 'bg-indigo-50', link: '/projects/view' },
    { label: 'Certificates', count: stats?.certificates || 0, color: 'from-amber-400 to-orange-500', textColor: 'text-amber-600', bgLight: 'bg-amber-50', link: '/certificates/view' },
    { label: 'Skills', count: stats?.skills || 0, color: 'from-emerald-400 to-teal-600', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', link: '/skills/view' },
    { label: 'Internships', count: stats?.internships || 0, color: 'from-purple-500 to-pink-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50', link: '/internship/view' },
  ];

  // Domain skills proficiency distribution
  const techStackDistribution = [
    { domain: 'Frontend (React, Tailwind, Next.js)', level: 88, icon: Code2, color: 'bg-blue-500' },
    { domain: 'Backend (Node.js, Express, REST APIs)', level: 82, icon: Layers, color: 'bg-indigo-500' },
    { domain: 'Databases (MongoDB, Mongoose, SQL)', level: 78, icon: Database, color: 'bg-emerald-500' },
    { domain: 'Cloud, DevOps & Tools (Git, Render, Vercel)', level: 75, icon: Cloud, color: 'bg-amber-500' },
  ];

  // Portfolio completion calculation
  const completionScore = Math.min(
    100,
    ((stats?.projects > 0 ? 25 : 0) +
     (stats?.certificates > 0 ? 25 : 0) +
     (stats?.skills > 0 ? 20 : 0) +
     (stats?.internships > 0 ? 15 : 0) +
     (stats?.resumeCount > 0 ? 10 : 0) +
     (stats?.profileCount > 0 ? 5 : 0))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Solid Graph - Activity & Content Trends */}
      <div className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-slate-200/80 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Portfolio Activity & Analytics
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Live
                </span>
              </h3>
              <p className="text-xs text-slate-500">Track content growth, additions, and module distribution</p>
            </div>
          </div>

          {/* Toggle Tab Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Growth Trend
            </button>
            <button
              onClick={() => setActiveTab('category')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'category'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" /> By Category
            </button>
          </div>
        </div>

        {/* Tab 1: Solid Growth Bar & Wave Chart */}
        {activeTab === 'monthly' ? (
          <div className="space-y-6">
            <div className="relative h-60 w-full flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">Max</div>
                <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">Mid</div>
                <div className="border-b border-slate-200 w-full text-[10px] text-slate-400">0</div>
              </div>

              {/* Interactive Bars */}
              {monthlyData.map((item, idx) => {
                const heightPercent = Math.min(100, Math.max(15, (item.total / maxTotal) * 100));
                const isHovered = hoveredBar === idx;

                return (
                  <div
                    key={idx}
                    className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl font-medium whitespace-nowrap flex flex-col items-center">
                        <span>{item.month}: {item.total} Total Items</span>
                        <div className="text-[10px] text-slate-300">
                          {item.projects} Projects • {item.certificates} Certs
                        </div>
                        <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-1 mt-0.5"></div>
                      </div>
                    )}

                    {/* Stacked Solid Bar */}
                    <div className="w-full max-w-[42px] flex flex-col justify-end rounded-t-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md bg-slate-100" style={{ height: `${heightPercent}%` }}>
                      <div 
                        className="w-full bg-gradient-to-t from-indigo-600 to-blue-500 transition-all duration-500" 
                        style={{ height: `${Math.max(20, (item.projects / (item.total || 1)) * 100)}%` }}
                      />
                      <div 
                        className="w-full bg-gradient-to-t from-amber-500 to-orange-400 transition-all duration-500" 
                        style={{ height: `${Math.max(15, (item.certificates / (item.total || 1)) * 100)}%` }}
                      />
                    </div>

                    {/* Month Label */}
                    <span className={`text-xs font-semibold mt-3 transition-colors ${isHovered ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend & Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                  <span className="text-slate-600 font-medium">Projects Activity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-slate-600 font-medium">Certificates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-600 font-medium">Skills Logged</span>
                </div>
              </div>
              <div className="text-slate-500 font-medium">
                Total portfolio items: <span className="font-bold text-slate-800">{totalItems}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Category Breakdown View */
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, idx) => {
                const percentage = totalItems > 0 ? Math.round((cat.count / totalItems) * 100) : 0;
                return (
                  <Link
                    key={idx}
                    to={cat.link}
                    className="p-4 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group bg-gradient-to-br from-white to-slate-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cat.bgLight} ${cat.textColor}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-black text-slate-800">{cat.count}</span>
                      <span className="text-xs text-slate-400">entries recorded</span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.max(8, percentage)}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Side Card: Skills Domain Breakdown & Completion Ring */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-slate-200/80 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Portfolio Status</h3>
                <p className="text-xs text-slate-500">Live health & completion score</p>
              </div>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {completionScore}% Score
            </span>
          </div>

          {/* Completion Progress Bar */}
          <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completeness Score
              </span>
              <span className="text-indigo-600 font-bold">{completionScore}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${completionScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {completionScore === 100
                ? '🎉 All portfolio sections are active & complete!'
                : 'Add more projects, certificates, and skills to reach 100%.'}
            </p>
          </div>

          {/* Tech Stack Distribution */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Domain Mastery Meter</h4>
          <div className="space-y-3.5">
            {techStackDistribution.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-slate-500" />
                      {item.domain}
                    </span>
                    <span className="font-bold text-slate-800">{item.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Want to update skills?</span>
          <Link
            to="/skills/view"
            className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
          >
            Manage Skills <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
