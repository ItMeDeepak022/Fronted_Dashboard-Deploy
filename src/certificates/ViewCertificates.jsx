import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function ViewCertificates() {



    let [data, setdata] = useState([])
    let [path, setpath] = useState('')

    let getData = () => {
        setloading(true)
        axios.get(`https://my-portfolio-backend-2026.onrender.com/admin/view-certificate`)
            .then((res) => res.data)
            .then((finalRes) => {
                setdata(finalRes.data);
                setpath(finalRes.path)
                setloading(false)


            })


    }

    useEffect(() => {
        getData()
    }, [])
    let [loader, setloader] = useState(null)
    let [loading, setloading] = useState(false)

    let getId = (e) => {

        let id = (e.target.value)
        setloader(id)
        let Isdelete = confirm("Are you sure to delete...")
        if (Isdelete) {
            axios.delete(`https://my-portfolio-backend-2026.onrender.com/admin/delete-certificate/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setloader(null)
                    // console.log(finalRes);
                    getData()
                    toast.success(finalRes.message)

                })
        }
        else {
            setloader(null)
        }

    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-500">
                <div className="w-15 h-15 rounded-full animate-spin border-8 border-solid border-white  border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4  ">
            <ToastContainer />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {
                    data.length > 0 ?
                        data.map((obj, index) => {
                            let { certificateTitle, certificateImg, certificatePdf } = obj
                            return (
                                <div className="w-full  max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">

                                    {/*  Certificates Image */}
                                    <div className="w-full h-56  md:h-86 relative">
                                        <img
                                            src={path + certificateImg}
                                            alt=" Certificates"
                                            className="w-full h-full object-fill"
                                        />


                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-8 space-y-4">

                                        {/* Title */}
                                        <div className='flex flex-col gap-1'>
                                            <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800"  >Certificate Title</h1>
                                            <h1 className="text-xl sm:text-2xl md:text-2xl font-normal text-gray-800">
                                                {certificateTitle}
                                            </h1>
                                        </div>



                                        {/* Link */}
                                        <div className="pt-2">
                                            <a
                                                href={path + certificatePdf}
                                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition text-sm sm:text-base"
                                            >
                                                🔗 View Live  Certificates
                                            </a>
                                        </div>

                                    </div>

                                    {/* Bottom Buttons */}
                                    <div className="flex gap-3 p-2 sm:px-8 pb-6">

                                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
                                            <NavLink to={`/certificates/edit/${obj._id}`} state={obj}>  ✏️ Edit </NavLink>
                                        </button>

                                        <button onClick={getId} value={obj._id} className="flex-1 flex justify-center items-center gap-5 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
                                            🗑 Delete
                                            {
                                                (loader === obj._id) && (
                                                    <div class="w-5 h-5 rounded-full animate-spin
                    border-4 border-solid border-white border-t-transparent"></div>
                                                )
                                            }
                                        </button>

                                    </div>

                                </div>
                            )
                        })
                        :

                        <div className='p-5 bg-red-700 text-white font-bold'>No Data Available</div>
                }



            </div>

        </div>
    )
}
