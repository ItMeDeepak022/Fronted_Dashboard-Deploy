import React, { useState } from 'react'

import { Outlet } from 'react-router'
import Sidebar from '../pages/Sidebar'
import Header from './Header'
import Footer from './Footer'
import { Columns2, Columns3Cog } from 'lucide-react'




export default function Layout() {

    let [collaps, setcollaps] = useState(false)

    let colOn = () => {
        setcollaps(!collaps)
    }

    return (
        <div className={`grid  transition-all lg:duration-250 md:duration-300 ease-in-out
         ${collaps ? "lg:grid-cols-[8%_auto] md:grid-cols-[15%_auto]" : "lg:grid-cols-[15%_auto] md:grid-cols-[25%_auto]"}  min-h-screen `}>


            <div className='relative'>

                {
                    collaps ?
                        <Columns3Cog onClick={colOn} size={18} className='fixed transition-all duration-500 ease-in-out top-5 md:left-23 lg:left-25 z-10 text-black cursor-pointer' />
                        :
                        <Columns2 onClick={colOn} size={18} className='fixed transition-all duration-500 ease-in-out top-5 md:left-40    lg:left-50 z-10 text-black cursor-pointer' />
                }




                <Sidebar collaps={collaps} />
            </div>





            <div className='flex-1  h-full'>
                {/* header  */}
                <Header />

                {/* outler */}
                <Outlet />


                {/* footer */}
                {/* <Footer/>   */}
            </div>


        </div>
    )
}
