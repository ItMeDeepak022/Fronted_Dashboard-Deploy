import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function AddIntern() {
    let navigate = useNavigate()
    let [loader, setloader] = useState(false)

    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add-intern`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()

                    setTimeout(() => {
                        navigate('/internship/view')
                    }, 1000);
                }
            })


    }
    return (
        <div className='md:m-0 m-2 '>
            <ToastContainer />
            <h1 className="text-3xl text-center m-5 font-bold text-gray-900 mb-8">Add Internship Details</h1>
            <form onSubmit={submitData} className="md:mt-8 p-0 border-1 rounded-2xl border-black flex md:flex-row flex-col md:gap-8  gap-3 md:p-8  max-w-4xl mx-auto shadow-lg">

                {/* Left Side - Image Upload */}

                <div className="flex-1 ">
                    <label className="w-full flex-col md:h-64 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
                        <div className="text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-gray-600">Click to upload image</p>
                        </div>
                        <input type="file" accept="image/*"
                            name='internImg'
                        />

                    </label>
                </div>

                {/* Right Side - Form Fields */}
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                            name='companyName'
                            type="text" placeholder="Enter company name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Intern Position</label>
                        <input type="text"
                            name='internPosition'
                            placeholder="Enter position" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className='w-full flex md:justify-start justify-center'>
                        <button type="submit" className=" flex justify-center items-center gap-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium self-start">
                            Save
                            {
                                loader && (
                                    <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                )
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
