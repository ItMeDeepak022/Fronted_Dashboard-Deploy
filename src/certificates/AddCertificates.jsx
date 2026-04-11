import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function AddCertificates() {
    let navigate = useNavigate()
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    let [loader,setloader]=useState(false)
    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        let form = e.target;
        let formValue = new FormData(form)

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add-certificate`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false)
                    toast.success(finalRes.message)
                    e.target.reset()

                    setTimeout(() => {
                        navigate('/certificates/view')
                    }, 1000);
                }
            })


    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-8">
            <ToastContainer />
            <form onSubmit={submitData} className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5">

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                    Add New  Certificates
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
                </div>

                {/*  Certificates Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certificates Title
                    </label>
                    <input
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
                </div>



                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Submit  Certificates
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
