import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function ViewIntern() {

    let [data, setdata] = useState([])
    let [path, setpath] = useState('')
    let [loading,setloading]=useState(false)
    let getData = () => {
        setloading(true)
        axios.get(`https://my-portfolio-backend-2026.onrender.com/admin/view-intern`)
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

    let getId = (e) => {
        let id = (e.target.value)
        setloader(id)
        let Isdelete = confirm("Are you sure to delete...")
        if (Isdelete) {
            axios.delete(`https://my-portfolio-backend-2026.onrender.com/admin/delete-intern/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setloader(null)
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
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-gray-50 p-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center m-3">Internship Details</h1>
                <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-5">

                    {
                        data.length > 0 ?
                            data.map((obj, index) => {
                                let { companyName, internPosition, internImg } = obj
                                return (
                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="w-full flex flex-col  p-0">
                                            {/* Internship Photo */}
                                            <div className="md:col-span-1 flex justify-center">
                                                <img
                                                    src={internImg}
                                                    alt="Internship"
                                                    className="w-full h-64 sm:object-fill object-center  object-contain   rounded-t-lg shadow-md"
                                                />
                                            </div>

                                            {/* Internship Details */}
                                            <div className="md:col-span-2 p-5">
                                                <div className="space-y-2">
                                                    <div>
                                                        <h2 className="text-sm font-semibold text-gray-500 uppercase">Company Name</h2>
                                                        <p className="text-2xl font-bold text-gray-900 mt-2">{companyName} </p>
                                                    </div>

                                                    <div>
                                                        <h2 className="text-sm font-semibold text-gray-500 uppercase">Intern Position</h2>
                                                        <p className="text-xl font-semibold text-gray-800 mt-2"> {internPosition} </p>
                                                    </div>


                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-4 mt-8">
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                                                        <Link to={`/internship/edit/${obj._id}`} state={obj}>Update</Link>
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
                                            </div>
                                        </div>


                                    </div>
                                )
                            })
                            :
                            <div className='p-3 bg-red-800 text-white font-bold '>No Data Available....</div>
                    }






                </div>
            </div>
        </div>
    )
}









