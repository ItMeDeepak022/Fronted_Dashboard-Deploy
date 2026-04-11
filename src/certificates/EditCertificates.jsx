import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function EditCertificates() {
    let { state } = useLocation()
    const [image, setImage] = useState(null);
    let navigate = useNavigate()

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };



    let [formData, setformData] = useState(
        {
            id: '',
            certificateTitle: '',
            certificateImg: '',
            certificatePdf: '',

        }
    )


    useEffect(() => {
        if (state) {
            setformData(
                {
                    id: state._id,
                    certificateTitle: state.certificateTitle,
                    certificateImg: state.certificateImg,
                    certificatePdf: state.certificatePdf,

                }
            )
        }
    }, [state])

    let [loader,setloader]=useState(false)
    let updateData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)
        axios.put(`https://my-portfolio-backend-2026.onrender.com/admin/edit-certificate/${formData.id}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)

                    setImage(null)
                    setformData(
                        {
                            id: '',
                            projectTitle: '',
                            aboutProject: '',
                            projectLink: '',
                            projectImg: ''
                        }
                    )
                    setTimeout(() => {
                        navigate('/certificates/view')
                    }, 700);
                }
            })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-8">
            <form onSubmit={updateData} className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5">
                <ToastContainer />
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                    Edit Certificates
                </h2>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificates Image
                    </label>

                    <label className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">

                        {image ? (
                            <img
                                src={image}
                                alt="preview"
                                className="h-full object-cover rounded-lg"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Click to upload image
                            </span>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                            name='certificateImg'
                        />

                    </label>
                    <p className='text-center'>Old Img:{formData.certificateImg}</p>
                </div>

                {/*  Certificates Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certificates Title
                    </label>
                    <input
                        value={formData.certificateTitle}
                        onChange={(e) => {
                            setformData(
                                { ...formData, certificateTitle: e.target.value }
                            )
                        }}
                        type="text"
                        name='certificateTitle'
                        placeholder="Enter  Certificates title"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* About  Certificates */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Pdf Certificates
                    </label>
                    <input
                        type='file'
                        name='certificatePdf'
                        accept='.pdf'
                        required

                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    <p className='text-center'>Old Certificate Pdf:{formData.certificatePdf}</p>
                </div>



                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Update  Certificates
                    {
                        loader && (
                            <div class="w-5 h-5 rounded-full animate-spin
                    border-4 border-solid border-white border-t-transparent"></div>
                        )
                    }
                </button>

            </form>

        </div>
    )
}
