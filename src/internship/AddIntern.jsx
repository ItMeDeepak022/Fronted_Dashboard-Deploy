import React from 'react'

export default function AddIntern() {
    return (
        <div>
            <h1 className="text-3xl text-center m-5 font-bold text-gray-900 mb-8">Add Internship Details</h1>
            <form className="mt-8 border-1 rounded-2xl border-black flex md:flex-row flex-col md:gap-8  gap-3 md:p-8 p-1 max-w-4xl mx-auto shadow-lg">

                {/* Left Side - Image Upload */}

                <div className="flex-1 ">
                    <label className="w-full flex-col md:h-64 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
                        <div className="text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-gray-600">Click to upload image</p>
                        </div>
                        <input type="file" accept="image/*" />

                    </label>
                </div>

                {/* Right Side - Form Fields */}
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input type="text" placeholder="Enter company name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Intern Position</label>
                        <input type="text" placeholder="Enter position" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium self-start">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
