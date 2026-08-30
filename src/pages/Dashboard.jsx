import React from 'react'
import { Link } from 'react-router'

export default function Dashboard() {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}


                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Profile Card */}
                        <Link to={'/profile/view'}>
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition  border-1 border-black">
                                <div className="text-3xl mb-4">👤</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile</h2>
                                <p className="text-gray-600">View and manage your personal information</p>
                            </div>
                        </Link>

                        {/* Resume Card */}
                        <Link to={'/resume/view'}>
                            <div className="border-1 border-black bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <div className="text-3xl mb-4">📄</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Resume</h2>
                                <p className="text-gray-600">Upload and download your resume</p>
                            </div>
                        </Link>
                        {/* Skills Card */}
                        <Link to={'/skills/view'}>
                            <div className=" border-1 border-black bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <div className="text-3xl mb-4">⚙️</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Skills</h2>
                                <p className="text-gray-600">Showcase your technical expertise</p>
                            </div>
                        </Link>
                        {/* Internship Card */}
                        <Link to={'/internship/view'}>
                            <div className="border-1 border-black bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <div className="text-3xl mb-4">🏢</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Internship</h2>
                                <p className="text-gray-600">Manage your internship experience</p>
                            </div>
                        </Link>
                        {/* Projects Card */}
                        <Link to={'/projects/view'}>
                            <div className="border-1 border-black bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <div className="text-3xl mb-4">💻</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Projects</h2>
                                <p className="text-gray-600">Display your completed projects</p>
                            </div>
                        </Link>
                        {/* Certificates Card */}
                        <Link to={'/certificates/view'}>
                            <div className="border-1 border-black bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <div className="text-3xl mb-4">🎓</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificates</h2>
                                <p className="text-gray-600">Add your certifications and awards</p>
                            </div>
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}
