import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function AddResume() {
    let navigate = useNavigate()

    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add-resume`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    // console.log(finalRes);
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()

                    setTimeout(() => {
                        navigate('/resume/view')
                    }, 800);
                }
            })


    }
    let [loader, setloader] = useState(false)



    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 flex items-center justify-center  ">
                <ToastContainer />
                <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-2  sm:p-6 md:p-8">

                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
                        Add Resume
                    </h1>

                    {/* Responsive Grid */}
                    <  form onSubmit={submitData} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">

                        {/* LEFT: Upload */}
                        <label className="border-2 border-dashed border-indigo-300 rounded-lg p-6 sm:p-10 text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer flex flex-col items-center justify-center">



                            <input
                                type="file"
                                className='text-center'
                                name='resumeLetter'
                                required
                            />
                        </label>

                        {/* RIGHT: Form */}
                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Job Title"
                                required
                                name='resumeTitle'
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                            />

                            <textarea
                                placeholder="Description"
                                rows="4"
                                name='Description'
                                required
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                            />

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                                <button type="submit"  className="flex items-center justify-center gap-8 w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition">
                                    Upload
                                    {
                                        loader && (
                                            <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                        )
                                    }
                                </button>



                            </div>

                        </div>

                    </ form>

                </div>

            </div>
        </>
    )
}
