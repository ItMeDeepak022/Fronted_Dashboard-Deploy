import React, { useState } from 'react'

export default function AddResume() {



    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 flex items-center justify-center  ">

                <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-2  sm:p-6 md:p-8">

                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
                        Add Resume
                    </h1>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">

                        {/* LEFT: Upload */}
                        <label className="border-2 border-dashed border-indigo-300 rounded-lg p-6 sm:p-10 text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer flex flex-col items-center justify-center">

                             

                            <input
                                type="file"
                                 className='text-center'
                            />
                        </label>

                        {/* RIGHT: Form */}
                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Job Title"
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                            />

                            <textarea
                                placeholder="Description"
                                rows="4"
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                            />

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                                <button className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition">
                                    Upload
                                </button>

                                <button className="w-full bg-gray-200 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition">
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
