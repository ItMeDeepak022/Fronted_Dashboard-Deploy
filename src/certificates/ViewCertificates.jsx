import React from 'react'
import { NavLink } from 'react-router'

export default function ViewCertificates() {
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4  ">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className="w-full  max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">

                    {/*  Certificates Image */}
                    <div className="w-full h-56  md:h-86 relative">
                        <img
                            src=" https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg"
                            alt=" Certificates"
                            className="w-full h-full object-cover"
                        />


                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-8 space-y-4">

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                             Certificates Management System
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            This is a full stack MERN  Certificates where users can manage tasks,
                            track progress, and collaborate in real-time. It includes authentication,
                            dashboard analytics, and responsive UI design.
                        </p>

                        {/* Link */}
                        <div className="pt-2">
                            <a
                                href="#"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition text-sm sm:text-base"
                            >
                                🔗 View Live  Certificates
                            </a>
                        </div>

                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex gap-3 p-2 sm:px-8 pb-6">

                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
                          <NavLink to={'/certificates/edit/:id'}>  ✏️ Edit </NavLink> 
                        </button>

                        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
                            🗑 Delete
                        </button>

                    </div>

                </div>

                 
                 
            </div>

        </div>
    )
}
