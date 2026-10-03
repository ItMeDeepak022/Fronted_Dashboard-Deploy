import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { MdAdminPanelSettings, MdCancel, MdDashboard } from "react-icons/md";
import { CiMenuFries } from 'react-icons/ci';
import { RxCrossCircled } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
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
} from "lucide-react";
export default function Sidebar({ collaps }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    let [slider, setslider] = useState(true)
    let navigate = useNavigate()
    let Sliders = () => {
        setslider(!slider)
    }

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);

    };

    let logout = () => {
        // localStorage.removeItem('token')
        // localStorage.removeItem('Fletter') 
        localStorage.clear();
        navigate('/')

    }



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
                    className="fixed z-[70] right-3 top-4 md:hidden cursor-pointer transition-all duration-500"
                    onClick={Sliders}
                    aria-label="Open menu"
                >
                    <CiMenuFries className="w-7 h-7 font-extrabold text-black" />
                </button>
            ) : (
                <button
                    className="fixed z-[70] right-3 top-4 md:hidden cursor-pointer transition-all duration-500"
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
                <div className="shrink-0 w-full bg-white py-[5px] flex justify-around gap-9 items-center border-b-1 border-b-gray-200">
                    <MdAdminPanelSettings className="text-[65px] text-black font-bold" />

                    <IoIosNotifications className="text-[30px] text-black transition hover:bg-slate-200 rounded cursor-pointer" />
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
                <div className="shrink-0 mt-auto p-3 border-t-1 border-t-gray-200 bg-white">
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
        </>
    );
}
