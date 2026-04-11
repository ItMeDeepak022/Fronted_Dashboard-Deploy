import React from 'react'
import { MdAdminPanelSettings } from 'react-icons/md'
import { CiMenuFries } from "react-icons/ci";

export default function Header() {
    let fletter=localStorage.getItem("Fletter")
    return (
        <>
            <header className="sticky top-0  z-50 w-full bg-white text-black shadow-lg  ">
                <div className="max-w-7xl mx-auto md:px-0 md:py-4 px-2 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex  justify-center items-center space-x-3">
                            
                            <div className=" hidden text-2xl text-white font-bold md:w-10 md:h-10 w-12 h-12 bg-blue-500 rounded-full md:flex items-center justify-center font-bold ">
                                 {fletter}
                            </div>
                            <MdAdminPanelSettings className='w-12 h-12 md:hidden flex justify-center' />
                            <h1 className=" md:text-2xl text-[18px] text-center py-2 font-bold rounded-lg md:px-3 md:py-1 transition hover:bg-slate-100">Admin Dashboard</h1>
                        </div>



                        <div className="flex items-center gap-5 md:gap-0 space-x-4 sm:block hidden">
                            <button className="md:px-5  p-2 hover:bg-slate-100 rounded-lg transition ">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}
