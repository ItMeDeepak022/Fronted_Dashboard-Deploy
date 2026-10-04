import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { MdAdminPanelSettings, MdCancel, MdDashboard } from "react-icons/md";
import { CiMenuFries } from 'react-icons/ci';
import { RxCrossCircled } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { toast } from 'react-toastify';
import {
    User,
    FileText,
    Lightbulb,
    BriefcaseBusiness,
    FolderGit2,
    Award,
    Icon,
    LayoutDashboard,
    UserRoundPlus,
    View,
    Eye,
    Bell,
    UserShield,
    LogOut,
} from "lucide-react";

export default function Sidebar({ collaps }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    let [slider, setslider] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    let navigate = useNavigate();

    let Sliders = () => {
        setslider(!slider);
    };

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);
    };

    let logout = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        window.dispatchEvent(new Event('session_logout'));
        sessionStorage.setItem('session_expired', 'true');
        toast.dismiss();
        localStorage.clear();
        setShowLogoutModal(false);
        navigate('/');
    };



    const siderBarlist = [
        {
            name: "Profile",
            to: "profile",
            icon: User,
        },
        {
            name: "Resume",
            to: "resume",
            icon: FileText,
        },
        {
            name: "Skills",
            to: "skills",
            icon: Lightbulb,
        },
        {
            name: "Internship",
            to: "internship",
            icon: BriefcaseBusiness,
        },
        {
            name: "Projects",
            to: "projects",
            icon: FolderGit2,
        },
        {
            name: "Certificates",
            to: "certificates",
            icon: Award,
        },
    ];

    // let siderBarlist = ['Profile', 'Resume', 'Skills', 'Internship', 'Projects', "Certificates"]


    return (
        <>
            {/* ================= MOBILE SIDEBAR ================= */}

           

            {slider ? (
                <button
                    className="fixed z-[70] right-4 top-4 md:hidden cursor-pointer transition-all duration-300 p-1 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    onClick={Sliders}
                    aria-label="Open menu"
                >
                    <CiMenuFries className="w-7.5 h-7 font-extrabold text-black" />
                </button>
            ) : (
                <button
                    className="fixed z-[70] right-4 top-4 md:hidden cursor-pointer transition-all duration-300 p-1 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    onClick={Sliders}
                    aria-label="Close menu"
                >
                    <RxCrossCircled className="w-8 h-8 font-extrabold text-black" />
                </button>
            )}



            <nav
                className={`w-[70%] sm:w-[50%] max-w-[230px] h-screen h-[100dvh]   fixed top-0
        ${slider ? "left-[-100%]" : "left-0"}
        transition-all duration-500 z-[60]
        md:hidden flex flex-col bg-white shadow-lg`}
            >
                <div className="shrink-0 w-full bg-white py-[15px] flex justify-around gap-9 items-center border-b-1 border-b-gray-200">
                    <UserShield size={35} className="text-black font-bold" />

                    <Bell className="text-[30px] text-black transition hover:bg-slate-200 rounded cursor-pointer" />
                </div>

                <ul className="flex-1 min-h-0 overflow-y-scroll scroll-smooth flex flex-col gap-2 py-3 px-4 ">

                    {/* Dashboard */}
                    <Link to="/dashboard" onClick={Sliders}>
                        <li
                            className="flex items-center gap-3 transition bg-slate-100 px-4 py-2 text-black rounded-[25px] text-left cursor-pointer"
                        >
                            <LayoutDashboard size={20} /> Dashboard
                        </li>
                    </Link>

                    {/* Sidebar Items */}
                    {siderBarlist.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <li key={index} >

                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className="w-full transition bg-slate-100 px-4 py-2 text-black rounded-[25px] block text-left cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} />

                                        <span>
                                            {item.name}
                                        </span>
                                    </div>
                                </button>

                                {openDropdown === item.name && (
                                    <ul className="ml-6 mt-1 flex flex-col gap-1 w-[80%]">

                                        <Link to={`/${item.to}/add`}>
                                            <li
                                                onClick={Sliders}
                                                className="transition bg-slate-100   px-3 py-1.5 text-black rounded-[25px] pl-5 flex items-center gap-2 text-sm cursor-pointer"
                                            >
                                                <UserRoundPlus size={15} />Add
                                            </li>
                                        </Link>

                                        <Link to={`/${item.to}/view`}>
                                            <li
                                                onClick={Sliders}
                                                className="transition bg-slate-100   px-3 py-1.5 text-black rounded-[25px] pl-5 flex items-center gap-2 bg-slate-150 text-sm cursor-pointer"
                                            >
                                                <Eye size={15} />View
                                            </li>
                                        </Link>

                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Logout */}
                <div className=" fixed bottom-1 w-57.5 shrink-0 mt-auto p-3 border-t-1 border-t-gray-200 bg-white">
                    <button
                        className="cursor-pointer font-bold hover:bg-slate-200 bg-slate-100 w-full py-2 rounded-[25px] text-black text-center block"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>


            {/* ================= DESKTOP SIDEBAR ================= */}

            <nav className="sticky top-0 left-0 md:w-full md:h-screen hidden text-white md:flex md:flex-col md:gap-4 md:shadow-lg md:bg-gray-150">

                <div className="shrink-0 w-full bg-white py-[5px] flex items-center justify-center border-b-1 border-b-gray-200">
                    <MdAdminPanelSettings className="text-[62px] text-black font-bold" />
                </div>

                <ul className="flex-1 min-h-0  custom-scrollbar flex flex-col gap-2 px-5 py-2">

                    {/* Dashboard */}
                    <Link to="/dashboard">
                        <li
                            className={`w-full flex   ${collaps ? "justify-center bg-none" : "justify-start bg-slate-100"} items-center gap-3 transition hover:bg-slate-100  px-4 py-2 text-black rounded-[10px] text-left cursor-pointer`}
                        >


                            {
                                collaps ?
                                    <LayoutDashboard size={25} />
                                    :
                                    <>
                                        <LayoutDashboard size={20} />   Dashboard
                                    </>

                            }
                        </li>
                    </Link>

                    {/* Sidebar Items */}
                    {siderBarlist.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <li key={index}>

                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className={`w-full  hover:bg-slate-100 ${collaps ? "bg-none" : "bg-slate-100"} px-4 py-2 text-black rounded-[10px] block text-left cursor-pointer`}
                                >
                                    <div className={`flex    ${collaps ? "justify-center" : "justify-start"} items-center gap-3`}>
                                        {
                                            collaps ?
                                                <Icon size={25} />
                                                :
                                                <>
                                                    <Icon size={20} />

                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </>
                                        }
                                    </div>
                                </button>

                                {openDropdown === item.name && (
                                    <ul className="ml-4 mt-1 flex flex-col gap-1 ">

                                        <li className="transition hover:bg-slate-100 px-2 py-1 text-black rounded-[10px] pl-5 block bg-slate-200 cursor-pointer">
                                            <Link to={`/${item.to}/add`} className="flex gap-2 items-center">


                                                {
                                                    collaps ?
                                                        <UserRoundPlus size={18} />
                                                        :
                                                        <>
                                                            <UserRoundPlus size={20} />Add
                                                        </>
                                                }
                                            </Link>
                                        </li>

                                        <li className="transition hover:bg-slate-100 px-2 py-1 text-black rounded-[10px] pl-5 block bg-slate-200 cursor-pointer">
                                            <Link to={`/${item.to}/view`} className="flex gap-2 items-center">

                                                {
                                                    collaps ?
                                                        <Eye size={18} />
                                                        :
                                                        <>
                                                            <Eye size={20} />View
                                                        </>
                                                }
                                            </Link>
                                        </li>

                                    </ul>
                                )}

                            </li>
                        );
                    })}
                </ul>

                {/* Logout */}
                <div className="shrink-0 mt-auto p-3 border-t-1 border-t-gray-200">
                    <button
                        className="cursor-pointer font-bold hover:bg-slate-300 bg-slate-200 w-full py-2  rounded-[10px] text-black text-center block"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>

            </nav>
            {/* ================= NORMAL & PROFESSIONAL LOGOUT POPUP MODAL ================= */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 max-w-sm w-full p-6 text-center relative overflow-hidden transition-all duration-200">
                        

                        {/* Icon */}
                        <div className="w-13 h-13 rounded-2xl bg-rose-50 border border-rose-200/70 text-rose-600 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
                            <LogOut className="w-6 h-6 stroke-[2.2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                            Confirm Logout
                        </h3>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5 max-w-[270px] mx-auto">
                            Are you sure you want to end your current session? You will be redirected to the login screen.
                        </p>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmLogout}
                                className="w-full bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition shadow-sm cursor-pointer"
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
