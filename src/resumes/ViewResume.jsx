import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';

export default function ViewResume() {
    let [resumedata, setresumedata] = useState('')
    let [path, setpath] = useState('')
    let [loading, setloading] = useState(false)

    let getresumeData = (e) => {
        setloading(true)
        axios.get(`https://my-portfolio-backend-2026.onrender.com/admin/view-resume`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                setresumedata(finalRes.data)
                setpath(finalRes.path)
                setloading(false)
            })


    }
    useEffect(() => {
        getresumeData()
    }, [])

    // To access the id for delete logics

    let getId = (e) => {
        e.preventDefault()
        let id = (e.target.value)
        setloader(id)
        let Isdelete = confirm("Are you sure to delete...")
        if (Isdelete) {

            axios.delete(`https://my-portfolio-backend-2026.onrender.com/admin/delete-resume/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getresumeData()
                    setloader(null)
                    toast.success(finalRes.message)

                })
        }
        else {
            setloader(null)
        }

    }

    let [loader, setloader] = useState(null)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-500">
                <div className="w-15 h-15 rounded-full animate-spin border-8 border-solid border-white  border-t-transparent"></div>
            </div>
        );
    }

    return (
        <>

            <ToastContainer />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-10">

                <div className="max-w-6xl mx-auto ">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            📄 Resume Manager
                        </h1>


                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-indigo-200/60 text-gray-700">
                                <tr>
                                    <th className="p-5">Title</th>
                                    <th className="p-5">File</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    resumedata.length > 0 ?
                                        resumedata.map((obj, index) => {
                                            let { resumeLetter, resumeTitle, uploadDate } = obj
                                            let OnlyResumeName = resumeLetter.split("/").pop().split("-").pop();
                                            const date = new Date(uploadDate);
                                            const formattedDate = date.toLocaleDateString("en-GB");
                                            return (
                                                <tr key={index} className="border-t hover:bg-indigo-50/50 transition">

                                                    <td className="p-5 font-semibold text-gray-800">
                                                        {resumeTitle}
                                                    </td>

                                                    <td className="p-5 text-gray-600">
                                                        {OnlyResumeName}
                                                    </td>

                                                    <td className="p-5 text-gray-500">
                                                        {formattedDate}
                                                    </td>

                                                    <td className="p-5">
                                                        <div className="flex justify-center gap-3">

                                                            <button className="px-3 py-1.5 text-sm bg-blue-500/90 text-white rounded-lg hover:scale-105 hover:bg-blue-600 transition">

                                                                <Link to={`/resume/edit/${obj._id}`} state={obj}>✏️ Edit</Link>
                                                            </button>

                                                            <button onClick={getId} value={obj._id} className="flex justify-center items-center gap-2 px-3 py-1.5 text-sm bg-red-500/90 text-white rounded-lg hover:scale-105 hover:bg-red-600 transition">
                                                                Delete
                                                                {
                                                                    (loader === obj._id) && (
                                                                        <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                                                    )
                                                                }
                                                            </button>

                                                            <button className="px-3 py-1.5 text-sm bg-green-500/90 text-white rounded-lg hover:scale-105 hover:bg-green-600 transition">
                                                                <a href={resumeLetter} download>
                                                                    Download
                                                                </a>
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className='p-5'>No Data Available</tr>
                                }


                            </tbody>

                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-5 md:hidden">

                        {
                            resumedata.length > 0 ?
                                resumedata.map((obj, index) => {
                                    let { resumeLetter, resumeTitle, uploadDate } = obj
                                    const date = new Date(uploadDate);
                                    const formattedDate = date.toLocaleDateString("en-GB");
                                    let OnlyResumeName = resumeLetter.split("/").pop().split("-").pop();
                                    return (
                                        <div
                                            key={index}
                                            className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
                                        >
                                            <h2 className="text-lg font-bold text-gray-800 mb-1">
                                                {OnlyResumeName}
                                            </h2>

                                            <p className="text-sm text-gray-600">
                                                {resumeTitle}
                                            </p>

                                            <p className="text-xs text-gray-400 mb-4">
                                                Uploaded on {formattedDate}
                                            </p>

                                            <div className="flex gap-2">

                                                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:scale-105 transition">
                                                    <Link to={`/resume/edit/${obj._id}`} state={obj}>✏️ Edit</Link>
                                                </button>

                                                <button onClick={getId} value={obj._id} className="flex justify-center items-center gap-2 px-3 py-1.5 text-sm bg-red-500/90 text-white rounded-lg hover:scale-105 hover:bg-red-600 transition">
                                                    Delete
                                                    {
                                                        loader && (
                                                            <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                                        )
                                                    }
                                                </button>

                                                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm hover:scale-105 transition">
                                                    <a href={path + resumeLetter} download>
                                                        Download
                                                    </a>
                                                </button>

                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='p-5'>No Data Available</div>
                        }

                    </div>

                </div>
            </div>

        </>
    )
}

