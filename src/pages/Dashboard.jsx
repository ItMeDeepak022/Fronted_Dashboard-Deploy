import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {
  FolderKanban,
  Award,
  Cpu,
  Briefcase,
  Plus,
  Eye,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  Layers,
  Calendar
} from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    skills: 0,
    internships: 0,
    profileCount: 0,
    resumeCount: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [adminName, setAdminName] = useState('');

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // Fetch all endpoints concurrently with resilient handling
      const [
        projectsRes,
        certsRes,
        skillsRes,
        internRes,
        profileRes,
        resumeRes
      ] = await Promise.allSettled([
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-project'),
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-certificate'),
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-skills'),
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-intern'),
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view'),
        axios.get('https://my-portfolio-backend-2026.onrender.com/admin/view-resume')
      ]);

      const projectsData = projectsRes.status === 'fulfilled' && projectsRes.value.data?.data ? projectsRes.value.data.data : [];
      const certsData = certsRes.status === 'fulfilled' && certsRes.value.data?.data ? certsRes.value.data.data : [];
      const skillsData = skillsRes.status === 'fulfilled' && skillsRes.value.data?.data ? skillsRes.value.data.data : [];
      const internData = internRes.status === 'fulfilled' && internRes.value.data?.data ? internRes.value.data.data : [];
      const profileData = profileRes.status === 'fulfilled' && profileRes.value.data?.data ? profileRes.value.data.data : [];
      const resumeData = resumeRes.status === 'fulfilled' && resumeRes.value.data?.data ? resumeRes.value.data.data : [];

      setStats({
        projects: Array.isArray(projectsData) ? projectsData.length : 0,
        certificates: Array.isArray(certsData) ? certsData.length : 0,
        skills: Array.isArray(skillsData) ? skillsData.length : 0,
        internships: Array.isArray(internData) ? internData.length : 0,
        profileCount: Array.isArray(profileData) ? profileData.length : 0,
        resumeCount: Array.isArray(resumeData) ? resumeData.length : 0,
      });

      if (Array.isArray(projectsData)) {
        setRecentProjects(projectsData.slice(-3).reverse());
      }
      if (Array.isArray(certsData)) {
        setRecentCertificates(certsData.slice(-3).reverse());
      }
      if (Array.isArray(profileData) && profileData.length > 0) {
        setAdminName(profileData[0]?.profileName || '');
      }
    } catch (err) {
      console.error('Failed to fetch dashboard metrics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Top summary stat cards config
  const statCards = [
    {
      title: 'Total Projects',
      count: stats.projects,
      subtext: 'Active showcases',
      icon: FolderKanban,
      iconBg: 'bg-blue-100 text-blue-700',
      badge: '+12% this mo.',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      viewLink: '/projects/view',
      addLink: '/projects/add',
    },
    {
      title: 'Total Certificates',
      count: stats.certificates,
      subtext: 'Verified credentials',
      icon: Award,
      iconBg: 'bg-amber-100 text-amber-700',
      badge: 'Verified',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      viewLink: '/certificates/view',
      addLink: '/certificates/add',
    },
    {
      title: 'Total Skills',
      count: stats.skills,
      subtext: 'Tech proficiencies',
      icon: Cpu,
      iconBg: 'bg-emerald-100 text-emerald-700',
      badge: 'Full Stack',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      viewLink: '/skills/view',
      addLink: '/skills/add',
    },
    {
      title: 'Internships',
      count: stats.internships,
      subtext: 'Work experience',
      icon: Briefcase,
      iconBg: 'bg-purple-100 text-purple-700',
      badge: 'Experience',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      viewLink: '/internship/view',
      addLink: '/internship/add',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Header Title and Quick Sync */}
        <div className=" hidden sm:flex items-center fixed left-70 top-5 z-50 gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {currentDate}
          </span>
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Syncing...' : 'Sync'}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* BELOW HEADER STAT CARDS DIV (REAL-TIME TOTALS)                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} shadow-xs group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div className="mt-4 mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    {loading ? (
                      <div className="w-12 h-8 bg-slate-200 rounded animate-pulse"></div>
                    ) : (
                      <span className="text-3xl font-black text-slate-800 tracking-tight">{card.count}</span>
                    )}
                    <span className="text-xs text-slate-500 font-medium">{card.subtext}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <Link
                    to={card.viewLink}
                    className="text-slate-600 hover:text-indigo-600 flex items-center gap-1 transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> View List
                  </Link>
                  <Link
                    to={card.addLink}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SOLID INTERACTIVE GRAPHS & ANALYTICS SECTION                              */}
        {/* ========================================================================= */}
        <DashboardCharts stats={stats} loading={loading} />

        {/* ========================================================================= */}
        {/* RECENT ITEMS & LIVE PORTFOLIO SHOWCASE                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Recent Projects</h3>
                  <p className="text-xs text-slate-500">Latest additions to your portfolio</p>
                </div>
              </div>
              <Link
                to="/projects/view"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
              >
                All ({stats.projects}) <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentProjects.length > 0 ? (
                recentProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/70 transition group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {proj.projectImg ? (
                        <img
                          src={proj.projectImg}
                          alt={proj.projectTitle}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                          PROJ
                        </div>
                      )}
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600">
                          {proj.projectTitle || 'Untitled Project'}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">
                          {proj.aboutProject || 'No description provided'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {proj.projectLink && (
                        <a
                          href={proj.projectLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 transition"
                          title="Open Live Project"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link
                        to={`/projects/edit/${proj._id}`}
                        state={proj}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">No projects added yet.</p>
                  <Link
                    to="/projects/add"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add your first project
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Certificates Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Recent Certificates</h3>
                  <p className="text-xs text-slate-500">Certifications and accolades</p>
                </div>
              </div>
              <Link
                to="/certificates/view"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline"
              >
                All ({stats.certificates}) <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentCertificates.length > 0 ? (
                recentCertificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-slate-50/70 transition group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {cert.certificateImg ? (
                        <img
                          src={cert.certificateImg}
                          alt={cert.certificateTitle}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                          CERT
                        </div>
                      )}
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-600">
                          {cert.certificateTitle || 'Certificate'}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold inline-block mt-0.5">
                          Verified Document
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cert.certificatePdf && (
                        <a
                          href={cert.certificatePdf}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition"
                          title="View PDF"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link
                        to={`/certificates/edit/${cert._id}`}
                        state={cert}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">No certificates added yet.</p>
                  <Link
                    to="/certificates/add"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add a certificate
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
