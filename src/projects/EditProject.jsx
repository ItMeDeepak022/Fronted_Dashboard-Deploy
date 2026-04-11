import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function EditProject() {
    let { state } = useLocation()
    const [image, setImage] = useState(null);
    let navigate = useNavigate()
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    let [formData, setformData] = useState(
        {
            id: '',
            projectTitle: '',
            aboutProject: '',
            projectLink: '',
            projectImg: ''
        }
    )

    useEffect(() => {
        if (state) {
            setformData(
                {
                    id: state._id,
                    projectTitle: state.projectTitle,
                    aboutProject: state.aboutProject,
                    projectLink: state.projectLink,
                    projectImg: state.projectImg
                }
            )
        }
    }, [state])

    let updateData = (e) => {
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)
        
        axios.put(`https://my-portfolio-backend-2026.onrender.com/admin/edit-project/${formData.id}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.message)

                    setImage(null)
                    setformData(
                        {
                            id: '',
                            projectTitle: '',
                            aboutProject: '',
                            projectLink: '',
                            projectImg: ''
                        }
                    )
                    setTimeout(() => {
                        navigate('/projects/view')
                    }, 700);
                }
            })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-8">
            <ToastContainer />
            <form onSubmit={updateData} className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5">

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                    Edit Project
                </h2>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Image
                    </label>

                    <label className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">

                        {image ? (
                            <img
                                src={image}
                                alt="preview"
                                className="h-full object-cover rounded-lg"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Click to upload image
                            </span>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                            name='projectImg'
                        />
                    </label>
                    <p className='p-1'>Old ProjectImg :{formData.projectImg}</p>
                </div>

                {/* Project Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title
                    </label>
                    <input
                        value={formData.projectTitle}
                        onChange={(e) => {
                            setformData(
                                { ...formData, projectTitle: e.target.value }
                            )
                        }}
                        type="text"
                        placeholder="Enter project title"
                        name='projectTitle'
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* About Project */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        About Project
                    </label>
                    <textarea
                        value={formData.aboutProject}
                        onChange={(e) => {
                            setformData(
                                { ...formData, aboutProject: e.target.value }
                            )
                        }}
                        name='aboutProject'
                        rows="4"
                        placeholder="Write about your project..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    ></textarea>
                </div>

                {/* Project Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Link
                    </label>
                    <input
                        value={formData.projectLink}
                        onChange={(e) => {
                            setformData(
                                { ...formData, projectLink: e.target.value }
                            )
                        }}
                        type="url"
                        name='projectLink'
                        placeholder="https://yourproject.com"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Update Project
                </button>

            </form>
        </div>
    )
}
