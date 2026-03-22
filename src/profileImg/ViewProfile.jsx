import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'

export default function ViewProfile() {
    return (
        <>
            <div className=" md:h-[30vh] h-[300px]  bg-gray-100 p-1 sm:p-6 flex justify-center items-center">

                <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

                    {/* Scroll wrapper for small screens */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse min-w-[300px]">

                            {/* Head */}
                            <thead className="bg-indigo-600 text-white text-xs sm:text-sm">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3">Profile</th>
                                    <th className="px-3 sm:px-6 py-3">Name</th>
                                    <th className="px-3 sm:px-6 py-3">Upload Date</th>
                                    <th className="px-3 sm:px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody className="divide-y text-xs sm:text-sm">

                                <tr className="hover:bg-gray-50">

                                    {/* Profile */}
                                    <td className="px-3 sm:px-6 py-3">
                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt="profile"
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                        />
                                    </td>

                                    {/* Name */}
                                    <td className="px-3 sm:px-6 py-3 font-medium text-gray-800">
                                        Admin User
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 font-medium text-gray-800">
                                        01-03-2026
                                    </td>
                                    {/* Actions */}
                                    <td className="px-3 sm:px-6 py-3">
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">

                                            <form className="w-full sm:w-auto">
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm"
                                                >
                                                    Update
                                                </button>
                                            </form>

                                            <form className="w-full sm:w-auto">
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </form>

                                        </div>
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}
