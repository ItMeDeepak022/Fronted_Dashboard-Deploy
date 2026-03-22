import React from 'react'
 
import { Outlet } from 'react-router'
import Sidebar from '../pages/Sidebar'
import Header from './Header'
import Footer from './Footer'
 

export default function Layout() {
    return (
        <div className='grid md:grid-cols-[10%_90%]  min-h-screen'>

             
               <Sidebar/>
            

            <div className='flex-1  h-full'>
                {/* header  */}
                <Header/>

                {/* outler */}
                <Outlet/>


                {/* footer */}
                 <Footer/>  
            </div>


        </div>
    )
}
