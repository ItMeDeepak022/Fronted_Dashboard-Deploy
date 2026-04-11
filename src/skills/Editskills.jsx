import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Editskills() {

    let { state } = useLocation()
    let [formData, setformData] = useState(
        {
            id: '',
            skill: '',
            level: '',
            Description: ''
        }
    )

    useEffect(() => {
        if (state) {
            setformData(
                {
                    id: state._id,
                    skill: state.skill,
                    level: state.level,
                    Description: state.Description
                }
            )
        }
    }, [state])

    let navigate = useNavigate()
    
    let [loader,setloader]=useState(false)

    let updateSkills = (e) => {
        setloader(true)
        e.preventDefault()
        axios.put(`https://my-portfolio-backend-2026.onrender.com/admin/edit-skill/${formData.id}`, formData)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    setformData(
                        {
                            id: '',
                            skill: '',
                            level: '',
                            Description: ''
                        }
                    )
                    setTimeout(() => {
                        navigate('/skills/view')
                    }, 1000);
                }
            })
    }
    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2"> Edit Your Skills</h1>
                        <p className="text-gray-600 mb-8">Showcase your professional abilities and expertise</p>

                        <form className="space-y-6" onSubmit={updateSkills}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                                <input
                                    value={formData.skill}
                                    onChange={(e) => {
                                        setformData(
                                            { ...formData, skill: e.target.value }
                                        )
                                    }}
                                    name='skill' type="text" placeholder="e.g., JavaScript, React, Python" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                <input
                                    value={formData.level}
                                    onChange={(e) => {
                                        setformData(
                                            { ...formData, level: e.target.value }
                                        )
                                    }}
                                    name='level' type="text" placeholder="e.g., Easy,Hard" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.Description}
                                    onChange={(e) => {
                                        setformData(
                                            { ...formData, Description: e.target.value }
                                        )
                                    }}
                                    name='Description' placeholder="Describe your experience with this skill" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>

                            <button type="submit" className="flex justify-center items-center gap-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200" >

                                Update Skill

                                {
                                    loader  && (
                                        <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                    )
                                }</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
