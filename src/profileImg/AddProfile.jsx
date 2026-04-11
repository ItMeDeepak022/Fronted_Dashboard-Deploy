import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function AddProfile() {
    let navigate = useNavigate()
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()
                    setImage(null)
                    setTimeout(() => {
                        navigate('/profile/view')
                    }, 1500);
                }
            })


    }
    let [loader, setloader] = useState(false)

    return (
        <>
            <div className="min-h-screen sm:w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-6">
                <ToastContainer />
                <form onSubmit={submitData}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8">

                    {/* Title */}
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">
                        Add Profile Image
                    </h1>

                    <p className="text-gray-500 mb-4 sm:mb-6 text-center text-xs sm:text-sm lg:text-base">
                        Upload your profile picture
                    </p>

                    {/* Upload Box */}
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">

                        {image ? (
                            <img
                                src={image}
                                alt="preview"
                                className="h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-gray-500 text-sm">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-gray-400">
                                    PNG, JPG, JPEG
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleImageChange}
                            className="hidden"
                            name='profileImg'
                        />
                    </label>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Name
                        </label>
                        <input
                            type="text"
                            required
                            name="profileName"
                            placeholder="Enter image name"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="flex justify-center items-center sm:gap-5 gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 lg:py-3 rounded-lg transition text-sm sm:text-base"
                        >
                            Upload

                            {
                                loader && (
                                    <div class="w-5 h-5 rounded-full animate-spin
                    border-4 border-solid border-white border-t-transparent"></div>
                                )
                            }
                        </button>
                    </div>

                </form>

            </div>

        </>
    )
}
