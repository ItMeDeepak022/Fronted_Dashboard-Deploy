import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';

export default function Viewskills() {
    let [skillData, setskillData] = useState([])

    let [loading, setloading] = useState(false)
    let getskillData = (e) => {
        setloading(true)
        axios.get(`https://my-portfolio-backend-2026.onrender.com/admin/view-skills`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                setskillData(finalRes.data)
                setloading(false)
            })


    }
    useEffect(() => {
        getskillData()
    }, [])

    let [loader, setloader] = useState(null)

    let getId = (e) => {

        let id = (e.target.value)
        setloader(id)
        let Isdelete = confirm("Are you sure to delete...")
        if (Isdelete) {
            axios.delete(`https://my-portfolio-backend-2026.onrender.com/admin/delete-skill/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getskillData()
                    setloader(null)
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
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            ⚙️ Skills
                        </h1>


                    </div>

                    {/* Desktop Table */}
                    <div className="grid grid-cols-1 gap-0 bg-white rounded-xl shadow overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-5">Skill</th>
                                    <th className="p-5">Level</th>
                                    <th className="p-5">Description</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    skillData.length > 0 ?
                                        skillData.map((obj, index) => {
                                            let { skill, level, Description } = obj
                                            return (
                                                <tr key={index} className="border-t hover:bg-gray-50">

                                                    <td className="sm:p-4  p-2 font-medium"> {skill} </td>

                                                    <td className="sm:p-4  p-2">
                                                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                            {level}
                                                        </span>
                                                    </td>

                                                    <td className="sm:p-4  p-2 sm:block hidden">
                                                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                            {Description}
                                                        </span>
                                                    </td>
                                                    <td className="sm:p-4  p-2">
                                                        <div className="flex  sm:flex-row flex-col items-center justify-center gap-2">

                                                            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                                                <Link to={`/skills/edit/${obj._id}`} state={obj}>Update</Link>
                                                            </button>

                                                            <button onClick={getId} value={obj._id} className="flex justify-center items-center gap-2 px-3 py-1.5 text-sm bg-red-500/90 text-white rounded-lg hover:scale-105 hover:bg-red-600 transition">
                                                                Delete
                                                                {
                                                                    (loader === obj._id) && (
                                                                        <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                                                    )
                                                                }
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                        :
                                        <tr aria-colspan={6}>No Data founds...</tr>

                                }

                            </tbody>

                        </table>
                    </div>



                </div>
            </div>
        </>
    )
}
