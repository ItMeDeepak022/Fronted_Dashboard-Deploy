import React from 'react'

export default function ViewResume() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-10">

                <div className="max-w-6xl mx-auto ">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            📄 Resume Manager
                        </h1>

                         
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-indigo-200/60 text-gray-700">
                                <tr>
                                    <th className="p-5">Title</th>
                                    <th className="p-5">File</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {[1, 2, 3].map((item) => (
                                    <tr key={item} className="border-t hover:bg-indigo-50/50 transition">

                                        <td className="p-5 font-semibold text-gray-800">
                                            Frontend Developer
                                        </td>

                                        <td className="p-5 text-gray-600">
                                            resume.pdf
                                        </td>

                                        <td className="p-5 text-gray-500">
                                            21 Mar 2026
                                        </td>

                                        <td className="p-5">
                                            <div className="flex justify-center gap-3">

                                                <button className="px-3 py-1.5 text-sm bg-blue-500/90 text-white rounded-lg hover:scale-105 hover:bg-blue-600 transition">
                                                    ✏️ Edit
                                                </button>

                                                <button className="px-3 py-1.5 text-sm bg-red-500/90 text-white rounded-lg hover:scale-105 hover:bg-red-600 transition">
                                                    🗑 Delete
                                                </button>

                                                <button className="px-3 py-1.5 text-sm bg-green-500/90 text-white rounded-lg hover:scale-105 hover:bg-green-600 transition">
                                                    ⬇ Download
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-5 md:hidden">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
                            >
                                <h2 className="text-lg font-bold text-gray-800 mb-1">
                                    Frontend Developer
                                </h2>

                                <p className="text-sm text-gray-600">
                                    resume.pdf
                                </p>

                                <p className="text-xs text-gray-400 mb-4">
                                    Uploaded on 21 Mar 2026
                                </p>

                                <div className="flex gap-2">

                                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:scale-105 transition">
                                        Edit
                                    </button>

                                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:scale-105 transition">
                                        Delete
                                    </button>

                                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm hover:scale-105 transition">
                                        Download
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
