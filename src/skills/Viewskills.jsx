import React from 'react'

export default function Viewskills() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            ⚙️ Skills  
                        </h1>

                         
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-4">Skill</th>
                                    <th className="p-4">Level</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {[1, 2, 3].map((item) => (
                                    <tr key={item} className="border-t hover:bg-gray-50">

                                        <td className="p-4 font-medium">React JS</td>

                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                Advanced
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">

                                                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                                    Update
                                                </button>

                                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">

                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-xl shadow p-4">

                                <h2 className="text-lg font-semibold text-gray-800">
                                    React JS
                                </h2>

                                <p className="text-sm text-green-600 mb-3">
                                    Advanced
                                </p>

                                <div className="flex gap-2">

                                    <button className="flex-1 bg-blue-500 text-white py-2 rounded text-sm">
                                        Update
                                    </button>

                                    <button className="flex-1 bg-red-500 text-white py-2 rounded text-sm">
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}
