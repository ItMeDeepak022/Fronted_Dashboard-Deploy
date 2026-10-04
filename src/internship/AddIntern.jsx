import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function AddIntern() {
    let navigate = useNavigate();
    let [loader, setloader] = useState(false);
    let [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    let submitData = (e) => {
        setloader(true);
        e.preventDefault();
        let form = e.target;
        let formValue = new FormData(form);

        axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/add-intern`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setloader(false);
                    toast.success(finalRes.message);
                    e.target.reset();
                    setImagePreview(null);

                    setTimeout(() => {
                        navigate('/internship/view');
                    }, 1000);
                } else {
                    setloader(false);
                    toast.error(finalRes.message || 'Failed to add internship');
                }
            })
            .catch((err) => {
                setloader(false);
                toast.error(err.response?.data?.message || 'Something went wrong');
            });
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-5 sm:p-8 md:p-10 border border-gray-100">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
                    Add Internship Details
                </h1>
                <p className="text-gray-500 text-sm mb-6 text-center md:text-left">
                    Upload certificate/company logo and provide internship details
                </p>

                <form onSubmit={submitData} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Side - Image Upload */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Internship Image
                        </label>
                        <label className="flex-1 flex flex-col items-center justify-center min-h-[200px] md:min-h-[260px] border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50/70 rounded-xl cursor-pointer transition p-4 relative overflow-hidden">
                            {imagePreview ? (
                                <div className="relative w-full h-full flex flex-col items-center justify-center">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-52 w-auto object-contain rounded-lg shadow-xs"
                                    />
                                    <span className="mt-2 text-xs font-medium text-indigo-600 bg-white/90 px-3 py-1 rounded-full shadow-xs">
                                        Click to change image
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center p-4">
                                    <div className="w-14 h-14 mb-3 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm">Click to upload image</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP formats</p>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                name="internImg"
                                required
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Right Side - Form Fields */}
                    <div className="flex flex-col justify-between gap-5">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    name="companyName"
                                    type="text"
                                    required
                                    placeholder="Enter company name"
                                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Intern Position
                                </label>
                                <input
                                    type="text"
                                    name="internPosition"
                                    required
                                    placeholder="e.g. Full Stack Developer Intern"
                                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-70 text-sm sm:text-base"
                            >
                                <span>Save Internship</span>
                                {loader && (
                                    <div className="w-5 h-5 rounded-full animate-spin border-3 border-solid border-white border-t-transparent shadow-xs"></div>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
