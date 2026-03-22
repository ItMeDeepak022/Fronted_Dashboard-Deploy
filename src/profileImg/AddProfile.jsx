import React, { useState } from 'react'

export default function AddProfile() {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    return (
        <>
            <div className="min-h-screen sm:w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-6">

                <form className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8">

                    {/* Title */}
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">
                        Add Profile Image
                    </h1>

                    <p className="text-gray-500 mb-4 sm:mb-6 text-center text-xs sm:text-sm lg:text-base">
                        Upload your profile picture
                    </p>

                    {/* Upload Box */}
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">

                        {image ? (
                            <img
                                src={image}
                                alt="preview"
                                className="h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-gray-500 text-sm">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-gray-400">
                                    PNG, JPG, JPEG
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {/* Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 lg:py-3 rounded-lg transition text-sm sm:text-base"
                        >
                            Upload
                        </button>
                    </div>

                </form>

            </div>

        </>
    )
}
