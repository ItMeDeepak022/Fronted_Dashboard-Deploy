import React, { useState } from 'react'

export default function AddCertificates() {

    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-8">

            <form className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5">

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
                        placeholder="Enter  Certificates title"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* About  Certificates */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        About  Certificates
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Write about your  Certificates..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    ></textarea>
                </div>

                {/*  Certificates Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                         Certificates Link
                    </label>
                    <input
                        type="url"
                        placeholder="https://your Certificates.com"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Submit  Certificates
                </button>

            </form>
        </div>
    )
}
