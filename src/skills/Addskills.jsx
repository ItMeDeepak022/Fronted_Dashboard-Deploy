import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function Addskills() {
    let navigate = useNavigate()

    let [loader, setloader] = useState(false)
    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        let obj = {
            skill: e.target.skill.value,
            level: e.target.level.value,
            Description: e.target.Description.value
        }

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add-skill`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()

                    setTimeout(() => {
                        navigate('/skills/view')
                    }, 800);
                }
            })


    }
    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Add Your Skills</h1>
                        <p className="text-gray-600 mb-8">Showcase your professional abilities and expertise</p>

                        <form className="space-y-6" onSubmit={submitData}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                                <input name='skill' type="text" placeholder="e.g., JavaScript, React, Python" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                <input name='level' type="text" placeholder="e.g., Easy,Hard" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea name='Description' placeholder="Describe your experience with this skill" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>

                            <button type="submit" className="flex justify-center items-center gap-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200">

                                Add Skill
                                {
                                    loader && (
                                        <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                    )
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
