import React, { useState, useRef } from 'react';
import {
    User,
    ShieldCheck,
    ShieldAlert,
    Bell,
    Sliders,
    KeyRound,
    Smartphone,
    Lock,
    Mail,
    Globe,
    Check,
    CheckCircle2,
    AlertTriangle,
    Trash2,
    Download,
    RefreshCw,
    Laptop,
    Eye,
    EyeOff,
    Save,
    QrCode,
    Copy,
    ExternalLink,
    Shield,
    Info,
    X,
    ChevronRight,
    UserCheck,
    Database,
    Camera,
    Upload,
    Image as ImageIcon
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Setting() {
    // Active Tab State: 'profile' | 'privacy' | 'notifications' | 'account'
    const [activeTab, setActiveTab] = useState('profile');

    // ==========================================
    // 1. PROFILE STATE
    // ==========================================
    const [profile, setProfile] = useState({
        name: 'Deepak Kushwaha',
        role: 'Full Stack MERN Developer & Admin',
        email: 'deepakkushwaha.dev@gmail.com',
        phone: '+91 98765 43210',
        location: 'Noida, Uttar Pradesh, India',
        portfolioUrl: 'https://deepak-portfolio.vercel.app',
        github: 'https://github.com/deepakkushwaha',
        linkedin: 'https://linkedin.com/in/deepakkushwaha',
        bio: 'Passionate Full Stack Developer specializing in React, Node.js, Express, and MongoDB. Enthusiastic about creating highly responsive, secure, and modern web applications.'
    });
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            toast.success('Avatar image uploaded preview!');
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.info('Avatar image removed');
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setTimeout(() => {
            setIsSavingProfile(false);
            toast.success('Profile details updated successfully!');
        }, 600);
    };

    // ==========================================
    // 2. PRIVACY & 2FA (STATIC UI ONLY)
    // ==========================================
    const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
        return localStorage.getItem("isToggle") === "true";
    });
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);


    // Static Backup Codes
    const staticBackupCodes = [
        '8492-1049', '5921-4920', '8302-1940',
        '3910-5829', '4729-1048', '9501-3829'
    ];

    // Static 2FA Button Toggle (UI Only, No Modals)
    const handleToggle2FA = async () => {
        const nextState = !is2FAEnabled;
        try {
            let response = await axios.put(`${API_BASE_URL}/admin/2FA`, { nextState }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data,'2FA')
            setIs2FAEnabled(nextState);
            localStorage.setItem("isToggle", String(nextState));

            if (response.data.status) {
                toast.success(response.data.message);
            } else {
                toast.warn(response.data.message);
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        toast.success('Password updated successfully!');
    };

    // ==========================================
    // 3. NOTIFICATIONS STATE
    // ==========================================
    const [notifications, setNotifications] = useState({
        emailInquiries: true,
        emailSecurity: true,
        emailWeeklyReport: false,
        emailSystemAlerts: true,
        pushBrowser: true,
        pushSpikeTraffic: true,
        soundAlerts: false,
        notificationFrequency: 'instant'
    });

    const toggleNotification = (key) => {
        setNotifications((prev) => {
            const val = !prev[key];
            const updated = { ...prev, [key]: val };
            toast.info(`Notification preference updated`, { autoClose: 1200 });
            return updated;
        });
    };

    // ==========================================
    // 4. ACCOUNT STATE
    // ==========================================
    const [accountConfig, setAccountConfig] = useState({
        timezone: 'Asia/Kolkata (IST +05:30)',
        dateFormat: 'DD/MM/YYYY',
        language: 'English (US)',
        autoBackup: true
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const handleConfirmDeleteAccount = () => {
        if (deleteConfirmText.trim() !== 'DELETE') {
            toast.error('Please type DELETE to confirm account deletion.');
            return;
        }
        setShowDeleteModal(false);
        setDeleteConfirmText('');
        toast.error('Account deletion initiated (UI only).');
    };

    const handleSaveAccountPreferences = (e) => {
        e.preventDefault();
        toast.success('Account preferences saved successfully!');
    };

    const handleExportData = () => {
        const fakeData = {
            exportDate: new Date().toISOString(),
            admin: profile.name,
            email: profile.email,
            version: '2.6.0'
        };
        const blob = new Blob([JSON.stringify(fakeData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-admin-backup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Portfolio administrative data exported successfully!');
    };

    // Tabs definition
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User, desc: 'Personal details & public persona' },
        {
            id: 'privacy',
            label: 'Privacy',
            icon: ShieldCheck,
            desc: '2FA security & access control',
            badge: is2FAEnabled ? '2FA ON' : '2FA OFF',
            badgeColor: is2FAEnabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
        },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts, email digests & sounds' },
        { id: 'account', label: 'Account', icon: Sliders, desc: 'Localization, system & data backup' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/60 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* ================= PAGE HEADER BANNER ================= */}
                <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                    {/* Subtle ambient gradient highlights */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-xs text-blue-600">
                                <Sliders className="w-6 h-6 stroke-[2.2]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                        Settings & Preferences
                                    </h1>

                                </div>
                                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                    Configure your administrator profile, privacy safeguards, two-factor authentication, and notifications.
                                </p>
                            </div>
                        </div>

                        {/* Quick 2FA status indicator badge */}
                        <div className="flex items-center gap-2 self-start md:self-center">
                            <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 shadow-2xs ${is2FAEnabled
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${is2FAEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span>2FA Security: <strong>{is2FAEnabled ? 'Active' : 'Disabled'}</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* ================= TABS NAVIGATION MENU ================= */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <nav className="flex space-x-2 overflow-x-auto no-scrollbar pb-1" aria-label="Settings Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                                            ? 'bg-slate-900 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                        <span>{tab.label}</span>
                                        {tab.badge && (
                                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold border ${tab.badgeColor}`}>
                                                {tab.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* ================= TAB 1: PROFILE ================= */}
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT COLUMN: Profile Logo & Details */}
                        <div className="lg:col-span-1 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center h-fit">

                            {/* Hidden File Input for Avatar Upload */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {/* Profile Logo / Avatar Preview */}
                            <div className="relative group mb-3">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-md border-4 border-white ring-2 ring-blue-100 hover:ring-blue-400 transition bg-slate-100 relative group"
                                    title="Click to upload avatar"
                                >
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black">
                                            DK
                                        </div>
                                    )}

                                    {/* Hover Overlay with Upload Icon */}
                                    <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white rounded-full">
                                        <Upload className="w-5 h-5 mb-0.5" />
                                        <span className="text-[10px] font-semibold">Change</span>
                                    </div>
                                </div>

                                {/* Floating Camera/Upload Button */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-white border border-slate-200 rounded-full shadow-md text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition cursor-pointer"
                                    title="Upload Image"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Action Buttons: Upload & Remove */}
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                                </button>

                                {avatarPreview && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition cursor-pointer"
                                        title="Remove photo"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Remove
                                    </button>
                                )}
                            </div>

                            {/* Profile Name & Details Below Logo */}
                            <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                            <span className="mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                Super Admin
                            </span>
                            <p className="text-xs text-slate-500 mt-1.5">{profile.role}</p>

                            <div className="mt-5 pt-5 border-t border-slate-100 w-full space-y-3 text-left text-xs text-slate-600">
                                <div className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span className="truncate">{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>{profile.phone}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>{profile.location}</span>
                                </div>
                            </div>

                            <div className="mt-6 w-full">
                                <span className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Verified Identity
                                </span>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Profile Form Data */}
                        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
                                <p className="text-xs text-slate-500">Update your portfolio admin profile details</p>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="admin@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Professional Title / Headline
                                        </label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={profile.role}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="e.g. Full Stack Developer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={profile.location}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Live Portfolio URL
                                        </label>
                                        <input
                                            type="url"
                                            name="portfolioUrl"
                                            value={profile.portfolioUrl}
                                            onChange={handleProfileChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Professional Summary / Bio
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleProfileChange}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                                        placeholder="Write a short summary about your expertise..."
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => toast.info('Changes discarded')}
                                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSavingProfile}
                                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition shadow-xs cursor-pointer"
                                    >
                                        <Save className="w-4 h-4" />
                                        {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                )}

                {/* ================= TAB 2: PRIVACY & 2FA ================= */}
                {activeTab === 'privacy' && (
                    <div className="space-y-6">

                        {/* ===== 2-COLUMN LAYOUT: 2FA (LEFT) & CHANGE PASSWORD (RIGHT) ===== */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* LEFT SIDE: Two-Factor Authentication (2FA) Card */}
                            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs transition-colors ${is2FAEnabled
                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                : 'bg-amber-50 border-amber-200 text-amber-600'
                                                }`}>
                                                {is2FAEnabled ? (
                                                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                                                ) : (
                                                    <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-slate-900">
                                                    Two-Factor Authentication
                                                </h3>
                                                <p className="text-xs text-slate-500">TOTP security protection</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5">

                                            <button
                                                type="button"
                                                onClick={handleToggle2FA}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${is2FAEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                                                    }`}
                                                role="switch"
                                                aria-checked={is2FAEnabled}
                                                title={is2FAEnabled ? 'Click to disable 2FA' : 'Click to enable 2FA'}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                        Two-Factor Authentication adds secondary verification during sign-in. Use a mobile authenticator app (Google Authenticator / Authy) to secure access.
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-800">Primary: TOTP App</h4>
                                                    <p className="text-[11px] text-slate-400">Google Authenticator / Authy</p>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${is2FAEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                                                }`}>
                                                {is2FAEnabled ? 'Connected' : 'Inactive'}
                                            </span>
                                        </div>

                                        {/* Dynamic Status / Recommendation Notice (UI Only) */}
                                        <div className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${is2FAEnabled
                                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                            : 'bg-amber-50/70 border-amber-200 text-amber-900'
                                            }`}>
                                            {is2FAEnabled ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            ) : (
                                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                            )}
                                            <div className="space-y-0.5">
                                                <h5 className="text-xs font-bold">
                                                    {is2FAEnabled ? 'Account Protected' : 'Protection Recommended'}
                                                </h5>
                                                <p className="text-[11px] leading-relaxed text-slate-600">
                                                    {is2FAEnabled
                                                        ? 'Two-Factor Authentication is currently active on your account. TOTP code is required on each admin sign-in.'
                                                        : 'Turn on 2FA using the toggle switch above to add an extra layer of protection to your administrative account.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Status Row Matching Right Card Footer */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${is2FAEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                        <span className="text-xs font-medium text-slate-500">
                                            Status: <strong className={is2FAEnabled ? 'text-emerald-700' : 'text-slate-700'}>
                                                {is2FAEnabled ? 'High Security (2FA Active)' : 'Standard (2FA Disabled)'}
                                            </strong>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleToggle2FA}
                                        className={`text-xs font-bold transition-colors cursor-pointer ${is2FAEnabled
                                            ? 'text-rose-600 hover:text-rose-700'
                                            : 'text-blue-600 hover:text-blue-700'
                                            }`}
                                    >
                                        {is2FAEnabled ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT SIDE: Change Password Card */}
                            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                                                <KeyRound className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-slate-900">Change Password</h3>
                                                <p className="text-xs text-slate-500">Update security credentials</p>
                                            </div>
                                        </div>
                                        <Lock className="w-4 h-4 text-slate-400" />
                                    </div>

                                    <form id="password-form" onSubmit={handlePasswordSubmit} className="space-y-3.5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showCurrentPass ? 'text' : 'password'}
                                                    defaultValue="••••••••"
                                                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                                    placeholder="Current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                                >
                                                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPass ? 'text' : 'password'}
                                                    defaultValue=""
                                                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                                    placeholder="New password (min 8 chars)"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPass(!showNewPass)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                                >
                                                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPass ? 'text' : 'password'}
                                                    defaultValue=""
                                                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                                >
                                                    {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        form="password-form"
                                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs cursor-pointer"
                                    >
                                        <Lock className="w-3.5 h-3.5" />
                                        Update Password
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                )}

                {/* ================= TAB 3: NOTIFICATIONS ================= */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        {/* Email Notifications */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900">Email Notifications</h3>
                                        <p className="text-xs text-slate-500">Delivered directly to {profile.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Portfolio Contact Inquiries</h4>
                                        <p className="text-xs text-slate-500">Receive an email whenever someone sends a message via your portfolio contact form</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('emailInquiries')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.emailInquiries ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.emailInquiries ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>

                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Security & Sign-in Alerts</h4>
                                        <p className="text-xs text-slate-500">Alert me when a login occurs from a new device or unknown IP</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('emailSecurity')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.emailSecurity ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.emailSecurity ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>

                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Weekly Performance Summary</h4>
                                        <p className="text-xs text-slate-500">Receive a weekly digest of project views, visitor counts, and resume downloads</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('emailWeeklyReport')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.emailWeeklyReport ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.emailWeeklyReport ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>

                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">System Maintenance & Backend Updates</h4>
                                        <p className="text-xs text-slate-500">Alerts regarding database sync, API uptime, or scheduled maintenance</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('emailSystemAlerts')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.emailSystemAlerts ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.emailSystemAlerts ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Push & In-App Alerts */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900">Browser & Sound Notifications</h3>
                                        <p className="text-xs text-slate-500">Real-time alerts while managing your dashboard</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Browser Push Notifications</h4>
                                        <p className="text-xs text-slate-500">Show desktop popups when new visitor interactions occur</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('pushBrowser')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.pushBrowser ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.pushBrowser ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>

                                <div className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Sound Effects</h4>
                                        <p className="text-xs text-slate-500">Play subtle audio feedback when saving changes or receiving notifications</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleNotification('soundAlerts')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${notifications.soundAlerts ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${notifications.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= TAB 4: ACCOUNT ================= */}
                {activeTab === 'account' && (
                    <div className="space-y-6">
                        {/* Account Overview */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">Account Overview</h3>
                                    <p className="text-xs text-slate-500">System credentials and administrative license</p>
                                </div>
                                <UserCheck className="w-5 h-5 text-slate-400" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Account Role</span>
                                    <p className="text-sm font-bold text-slate-900 mt-1">Super Administrator</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Account ID</span>
                                    <p className="text-sm font-mono font-bold text-slate-900 mt-1">ADM-2026-9481</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Database Region</span>
                                    <p className="text-sm font-bold text-slate-900 mt-1">ap-south-1 (Mumbai)</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">API Sync Status</span>
                                    <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Connected Live
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Regional & System Preferences Form */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                            <div className="border-b border-slate-100 pb-4 mb-5">
                                <h3 className="text-base font-bold text-slate-900">Regional & System Preferences</h3>
                                <p className="text-xs text-slate-500">Configure time zones, date formats, and language</p>
                            </div>

                            <form onSubmit={handleSaveAccountPreferences} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Time Zone</label>
                                        <select
                                            value={accountConfig.timezone}
                                            onChange={(e) => setAccountConfig({ ...accountConfig, timezone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        >
                                            <option value="Asia/Kolkata (IST +05:30)">Asia/Kolkata (IST +05:30)</option>
                                            <option value="UTC (GMT +00:00)">UTC (GMT +00:00)</option>
                                            <option value="America/New_York (EST -05:00)">America/New_York (EST -05:00)</option>
                                            <option value="Europe/London (GMT +00:00)">Europe/London (GMT +00:00)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date Display Format</label>
                                        <select
                                            value={accountConfig.dateFormat}
                                            onChange={(e) => setAccountConfig({ ...accountConfig, dateFormat: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        >
                                            <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 06/11/2026)</option>
                                            <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/06/2026)</option>
                                            <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-11-06)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">System Language</label>
                                        <select
                                            value={accountConfig.language}
                                            onChange={(e) => setAccountConfig({ ...accountConfig, language: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        >
                                            <option value="English (US)">English (US)</option>
                                            <option value="English (UK)">English (UK)</option>
                                            <option value="Hindi (India)">Hindi (India)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Account Preferences
                                    </button>
                                </div>
                            </form>
                        </div>



                        {/* Danger Zone */}
                        <div className="bg-white border border-rose-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-rose-900">Danger Zone</h3>
                                    <p className="text-xs text-rose-600">Irreversible actions that affect your administrator account.</p>
                                </div>
                            </div>


                            {/* Delete Administrator Account */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-50/50 border border-rose-200/60">
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-rose-950">Delete Administrator Account</h4>
                                    <p className="text-xs text-rose-700">Permanently remove your admin credentials, personal data, and dashboard privileges.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs cursor-pointer shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* ========================================================= */}
            {/* MODAL: DELETE ACCOUNT CONFIRMATION (UI ONLY)              */}
            {/* ========================================================= */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeleteConfirmText('');
                            }}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-2xs">
                            <Trash2 className="w-7 h-7 stroke-[2.2]" />
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                            Delete Administrator Account?
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                            This action is <strong>permanent</strong> and cannot be undone. All your project records, portfolio assets, and credentials will be deleted forever.
                        </p>

                        <div className="text-left bg-rose-50/70 border border-rose-200 rounded-xl p-3 mb-5">
                            <label className="block text-xs font-semibold text-rose-900 mb-1">
                                Type <strong className="font-mono text-rose-700">DELETE</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full px-3 py-2 bg-white border border-rose-300 rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmText('');
                                }}
                                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={deleteConfirmText.trim() !== 'DELETE'}
                                onClick={handleConfirmDeleteAccount}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition shadow-xs cursor-pointer ${deleteConfirmText.trim() === 'DELETE'
                                    ? 'bg-rose-600 hover:bg-rose-700 active:scale-95'
                                    : 'bg-rose-300 cursor-not-allowed'
                                    }`}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
