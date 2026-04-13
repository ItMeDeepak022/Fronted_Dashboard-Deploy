import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { MdAdminPanelSettings, MdCancel, MdDashboard } from "react-icons/md";
import { CiMenuFries } from 'react-icons/ci';
import { RxCrossCircled } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
export default function Sidebar() {
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
        localStorage.removeItem('token')
        localStorage.removeItem('Fletter')
        navigate('/')

    }

    let siderBarlist = ['Profile', 'Resume', 'Skills', 'Internship', 'Projects', "Certificates"]


    return (
        <>
            {/* For mobile screen  */}

            {
                slider ?

                    <button className=' fixed  z-70 right-3 top-4' onClick={Sliders}  >
                        <CiMenuFries className='w-7 h-7 font-extrabold text-black md:hidden ' />
                    </button>
                    :

                    <button className=' fixed  z-70 right-3 top-4' onClick={Sliders}  >
                        <RxCrossCircled className='w-8 h-8 font-extrabold text-black md:hidden ' />
                    </button>

            }

            <nav className={`w-[70%] min-h-screen
                 fixed top-0
                ${slider ? `left-[-100%]` : `left-0`}
                 transition-all duration-300
                 z-60 sm:hidden flex flex-col gap-3 bg-white shadow-lg`}>
                <div className="w-full bg-white py-[5px] flex justify-around gap-9 items-center  border-b border-gray-700">
                    <MdAdminPanelSettings className='text-[65px] text-black font-bold' />
                    <IoIosNotifications className='text-[30px] text-black  transition hover:bg-slate-200    rounded' />
                </div>
                <ul className="flex justify-center flex-col gap-2">
                  <Link to={'/dashboard'}>
                        <li onClick={Sliders} className="w-[85%] transition hover:bg-slate-200 bg-slate-300 px-4 py-2 text-black mx-2 rounded block text-left" >

                            Dashboard
                        </li>
                    </Link>
                    {siderBarlist.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => toggleDropdown(item)}
                                className="w-[85%] transition hover:bg-slate-200 bg-slate-300 px-4 py-2 text-black mx-2 rounded block text-left"
                            >
                                <div>
                                    {item}
                                </div>
                            </button>
                            {openDropdown === item && (
                                <ul className="ml-4 mt-1 flex flex-col gap-1  ">

                                    <Link to={`/${item.toLowerCase()}/add`}>
                                        <li onClick={Sliders} className="transition  bg-slate-200 hover:bg-slate-100 px-2 py-1 text-black rounded block ">

                                            Add

                                        </li>
                                    </Link>
                                    <Link to={`/${item.toLowerCase()}/view`}>
                                        <li onClick={Sliders} className="transition hover:bg-slate-100 px-2 py-1 text-black rounded block bg-slate-200">
                                            View

                                        </li>
                                    </Link>


                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className=" cursor-pointer mt-auto p-3 border-t border-gray-700">
                    <button className="cursor-pointer font-bold hover:bg-slate-300 bg-slate-200 w-full py-2 rounded text-black text-center block"
                        onClick={logout}
                    >Logout
                    </button>
                </div>
            </nav>

            {/* For mobile screen end */}


            <nav className=" sticky top-0 left-0 md:w-full md:h-screen hidden text-white md:flex md:flex-col md:gap-6 md:shadow-lg md:bg-gray-150">
                <div className="w-full bg-white py-[5px] flex items-center justify-center border-b border-gray-700">
                    <MdAdminPanelSettings className='text-[62px] text-black font-bold' />
                </div>
                <ul className="flex justify-center flex-col gap-2">
                    <Link to={'/dashboard'}>
                        <li onClick={Sliders} className="w-[85%] transition hover:bg-slate-200 bg-slate-300 px-4 py-2 text-black mx-2 rounded block text-left" >

                            Dashboard
                        </li>
                    </Link>


                    {siderBarlist.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => toggleDropdown(item)}
                                className="w-[85%] transition hover:bg-slate-200 bg-slate-300 px-4 py-2 text-black mx-2 rounded block text-left"
                            >
                                <div>
                                    {item}
                                </div>
                            </button>
                            {openDropdown === item && (
                                <ul className="ml-4 mt-1 flex flex-col gap-1  ">


                                    <li className="transition hover:bg-slate-100 px-2 py-1 text-black rounded block bg-slate-200">
                                        <Link
                                            to={`/${item.toLowerCase()}/add`}>
                                            Add
                                        </Link>
                                    </li>
                                    <li className="transition hover:bg-slate-100 px-2 py-1 text-black rounded block bg-slate-200">
                                        <Link
                                            to={`/${item.toLowerCase()}/view`}>
                                            View
                                        </Link>
                                    </li>

                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto p-3 border-t border-gray-700">
                    <button className="cursor-pointer font-bold hover:bg-slate-300 bg-slate-200 w-full py-2 rounded text-black text-center block"
                        onClick={logout}
                    >Logout
                    </button>
                </div>
            </nav>
        </>
    );
}
