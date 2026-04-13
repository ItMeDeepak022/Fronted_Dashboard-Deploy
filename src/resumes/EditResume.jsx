import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function EditResume() {
    let { state } = useLocation()
    let navigate = useNavigate()

    let [formData, setformData] = useState(
        {
            id: '',
            resumeLetter: '',
            resumeTitle: '',
            Description: ''
        }
    )

    useEffect(() => {
        if (state) {
            setformData(
                {
                    id: state._id,
                    resumeLetter: state.resumeLetter,
                    resumeTitle: state.resumeTitle,
                    Description: state.Description
                }
            )
        }
    }, [state])

    let OnlyResumeLetter = state.resumeLetter.split("/").pop().split("-").pop();
    let [loader,setloader]=useState(false)

    let updateResume = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        // //  if you need id (important)
        // formValue.append("id", formData.id);

        axios.put(`https://my-portfolio-backend-2026.onrender.com/admin/edit-resume/${formData.id}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()

                    setTimeout(() => {
                        navigate('/resume/view')
                    }, 700);
                }
            })
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 flex items-center justify-center  ">
                <ToastContainer />
                <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-2  sm:p-6 md:p-8">

                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
                        Edit Resume
                    </h1>

                    {/* Responsive Grid */}
                    < form onSubmit={updateResume} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">

                        {/* LEFT: Upload */}
                        <label  className="relative border-2 border-dashed border-indigo-300 rounded-lg p-6 sm:p-10 text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer flex flex-col items-center justify-center">



                            <input
                                type="file"
                                className='text-center'
                                name='resumeLetter'

                            />
                            <p className='absolute left-[17.5%] top-[55%] p-1'>old resume :{OnlyResumeLetter}</p>

                        </label>


                        {/* RIGHT: Form */}
                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Job Title"
                                name='resumeTitle'
                                value={formData.resumeTitle}
                                onChange={(e) => {
                                    setformData(
                                        { ...formData, resumeTitle: e.target.value }
                                    )
                                }}
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                            />

                            <textarea
                                placeholder="Description"
                                rows="4"
                                name='Description'
                                value={formData.Description}
                                onChange={(e) => {
                                    setformData(
                                        { ...formData, Description: e.target.value }
                                    )
                                }}
                                className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                            />

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                                <button className="w-full flex justify-center items-center  gap-5 bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition">
                                    Update
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

            </div>
        </>
    )
}
