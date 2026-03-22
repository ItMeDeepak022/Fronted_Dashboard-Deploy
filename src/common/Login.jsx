import React, { useState } from 'react'
import { useNavigate } from 'react-router'

 
 

export default function Login() {

    let navigate=useNavigate()

    let [show, setshow] = useState(true)

    let showLoginSignUp = () => {
        setshow(!show)
    }
     
    let redirect=(e)=>{
        e.preventDefault()
        navigate('/dashboard')
    }

   
    return (
        <>

            {
                show ?

                    <div className="flex items-center justify-center min-h-screen bg-white">
                        <div className="mx-auto  shadow-lg rounded-lg   grid grid-cols-1 md:grid-cols-2 ">
                            {/* Left Side - Welcome Section */}
                            <div className="rounded-tl-lg rounded-bl-lg bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
                                <img
                                    src="https://sales.webtel.in/images/Login-page-character1.png"
                                    alt="Admin Dashboard"
                                    className="w-64 h-64 object-cover rounded-lg mb-6 "
                                />
                                <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
                                <p className="text-center text-blue-100 text-lg">Manage your business efficiently</p>
                            </div>

                            {/* Right Side - Login Form */}
                            <div className="md:rounded-tr-lg md:rounded-br-lg rounded-lg shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

                                <div className='w-full flex flex-col items-center justify-center sm:hidden'>
                                    <img
                                        src="https://sales.webtel.in/images/Login-page-character1.png"
                                        alt="Admin Dashboard"
                                        className="w-full h-full object-cover"
                                    />
                                    <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
                                </div>
                                <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Login Here</h1>

                                <form className="space-y-4 p-5">
                                     
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <button onClick={redirect}
                                        type="submit"
                                        className="w-full  bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    >
                                       Login
                                    </button>
                                </form>

                                <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
                                    Don't have an account? <p className="text-blue-600 hover:underline">Sign Up Now</p>
                                </p>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="flex items-center justify-center min-h-screen bg-white">
                        <div className="mx-auto  shadow-lg rounded-lg   grid grid-cols-1 md:grid-cols-2 ">
                            {/* Left Side - Welcome Section */}
                            <div className="rounded-tl-lg rounded-bl-lg bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
                                <img
                                    src="https://sales.webtel.in/images/Login-page-character1.png"
                                    alt="Admin Dashboard"
                                    className="w-64 h-64 object-cover rounded-lg mb-6 "
                                />
                                <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
                                <p className="text-center text-blue-100 text-lg">Manage your business efficiently</p>
                            </div>

                            {/* Right Side - Login Form */}
                            <div className="md:rounded-tr-lg md:rounded-br-lg rounded-lg shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

                                <div className='w-full flex flex-col items-center justify-center sm:hidden'>
                                    <img
                                        src="https://sales.webtel.in/images/Login-page-character1.png"
                                        alt="Admin Dashboard"
                                        className="w-full h-full object-cover"
                                    />
                                    <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
                                </div>
                                <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up Now</h1>

                                <form className="space-y-4 p-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full  bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        Sign In
                                    </button>
                                </form>

                                <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
                                    Don't have an account? <p className="text-blue-600 hover:underline">Login Now</p>
                                </p>
                            </div>
                        </div>
                    </div>
            }



        </>
    )
}
