import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function ViewProfile() {

    let [profileData, setprofileData] = useState([])
    let [path, setpath] = useState('')
    let [loading, setloading] = useState(false)
    let getprofileData = (e) => {
        setloading(true)
        axios.get(`https://my-portfolio-backend-2026.onrender.com/admin/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                setprofileData(finalRes.data);
                setpath(finalRes.path)
                setloading(false)

            })


    }

    // To access the id for delete logics
    let [loader, setloader] = useState(null)
    let getId = (e) => {

        e.preventDefault()
        let id = (e.target.value)
        setloader(id)
        let Isdelete = confirm("Are you sure to delete...")
        if (Isdelete) {
            axios.delete(`https://my-portfolio-backend-2026.onrender.com/admin/delete/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getprofileData()
                    setloader(null)
                    // console.log(finalRes);
                    toast.success(finalRes.message)

                })
        }
        else {
            setloader(null)
        }

    }

    useEffect(() => {
        getprofileData()
    }, [])

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
            <div className=" md:h-[30vh] h-[300px]  bg-gray-100 p-1 sm:p-6 flex justify-center items-center">

                <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

                    {/* Scroll wrapper for small screens */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse min-w-[300px]">

                            {/* Head */}
                            <thead className="bg-indigo-600 text-white text-xs sm:text-sm">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3">Profile</th>
                                    <th className="px-3 sm:px-6 py-3">Name</th>
                                    <th className="px-3 sm:px-6 py-3">Upload Date</th>
                                    <th className="px-3 sm:px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody className="divide-y text-xs sm:text-sm">

                                {
                                    profileData.length > 0 ?
                                        profileData.map((obj, index) => {
                                            let { profileImg, profileName, uploadDate } = obj
                                            const date = new Date(uploadDate);
                                            const formattedDate = date.toLocaleDateString("en-GB");
                                            return (
                                                <tr className="hover:bg-gray-50">

                                                    {/* Profile */}
                                                    <td className="px-3 sm:px-6 py-3">
                                                        <img
                                                            src={path + profileImg}
                                                            alt="profile"
                                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                                        />
                                                    </td>

                                                    {/* Name */}
                                                    <td className="px-3 sm:px-6 py-3 font-medium text-gray-800">
                                                        {profileName}
                                                    </td>

                                                    <td className="px-3 sm:px-6 py-3 font-medium text-gray-800">
                                                        {formattedDate}
                                                    </td>
                                                    {/* Actions */}
                                                    <td className="px-3 sm:px-6 py-3">
                                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">

                                                            <form className="w-full sm:w-auto">
                                                                <button
                                                                    type="submit"
                                                                    className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm"
                                                                >
                                                                    <Link to={`/profile/edit/${obj._id}`} state={obj}>Edit</Link>
                                                                </button>
                                                            </form>

                                                            <form className="w-full sm:w-auto">
                                                                <button onClick={getId} value={obj._id} className="flex justify-center items-center gap-2 px-3 py-1.5 text-sm bg-red-500/90 text-white rounded-lg hover:scale-105 hover:bg-red-600 transition">
                                                                    Delete
                                                                    {
                                                                        (loader === obj._id) && (
                                                                            <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                                                        )
                                                                    }
                                                                </button>
                                                            </form>

                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>No Profile Data founds..</tr>
                                }

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}
