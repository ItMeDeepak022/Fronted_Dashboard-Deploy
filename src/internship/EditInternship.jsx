import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function EditInternship() {
    let navigate = useNavigate()
    let { state } = useLocation()
    let [formData, setformData] = useState(
        {
            id: '',
            companyName: '',
            internPosition: '',
            internImg: ''
        }
    )
    useEffect(() => {
        if (state) {
            setformData(
                {
                    id: state._id,
                    companyName: state.companyName,
                    internPosition: state.internPosition,
                    internImg: state.internImg
                })
        }
    }, [state])

    let [loader, setloader] = useState(false)

    let OnlyinterImg =state.internImg.split("/").pop().split("-").pop();


    let updateData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        axios.put(`https://my-portfolio-backend-2026.onrender.com/admin/edit-intern/${formData.id}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    setformData(
                        {
                            id: '',
                            companyName: '',
                            internPosition: '',
                            internImg: ''
                        }
                    )

                    setTimeout(() => {
                        navigate('/internship/view')
                    }, 800);
                }
                else {
                    toast.error(finalRes.message)
                    setloader(false)
                }
            })
    }
    return (
        <div className='md:m-0 m-2 '>
            <ToastContainer />
            <h1 className="text-3xl text-center m-5 font-bold text-gray-900 mb-8">Edit Internship Details</h1>
            <form onSubmit={updateData} className="md:mt-8 p-0 border-1 rounded-2xl border-black flex md:flex-row flex-col md:gap-8  gap-3 md:p-8  max-w-4xl mx-auto shadow-lg">

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
                    <p className='text-center'>old Img:{OnlyinterImg}</p>
                </div>

                {/* Right Side - Form Fields */}
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input type="text"
                            name='companyName'
                            value={formData.companyName}
                            onChange={(e) => {
                                setformData(
                                    { ...formData, companyName: e.target.value }
                                )
                            }}
                            placeholder="Enter company name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Intern Position</label>
                        <input type="text"
                            name='internPosition'
                            value={formData.internPosition}
                            onChange={(e) => {
                                setformData(
                                    { ...formData, internPosition: e.target.value }
                                )
                            }}
                            placeholder="Enter position" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className='w-full flex md:justify-start justify-center'>
                        <button type="submit" className="flex items-center justify-center gap-5 text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium self-start">
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
