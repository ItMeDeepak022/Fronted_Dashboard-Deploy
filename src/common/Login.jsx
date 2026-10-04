import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { broadcastAuthEvent, subscribeAuthEvents } from './authSync'

export default function Login() {

    let navigate = useNavigate()

    let [show, setshow] = useState(true)

    let [loader, setloader] = useState(false)

    useEffect(() => {
        // Cleanly dismiss any lingering toasts
        toast.dismiss();
        sessionStorage.clear();

        // Check if an active valid session already exists, auto-redirect to dashboard
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const parts = token.split(".");
                if (parts.length >= 2) {
                    const payload = JSON.parse(atob(parts[1]));
                    if (payload?.exp && payload.exp * 1000 > Date.now()) {
                        axios.get("https://my-portfolio-backend-2026.onrender.com/admin/verify-token", {
                            headers: { Authorization: `Bearer ${token}` },
                            timeout: 4000
                        }).then((res) => {
                            if (res.data?.status) {
                                window.location.href = '/dashboard';
                            }
                        }).catch(() => {});
                    }
                }
            } catch (_) {}
        }

        // Listen for login events from another tab (auto-sync without manual refresh)
        const unsubscribe = subscribeAuthEvents((event) => {
            if (event.type === 'AUTH_LOGIN') {
                toast.info("Logged in from another tab. Opening dashboard...", {
                    position: "top-center",
                    autoClose: 1500
                });
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 800);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    let showLoginSignUp = () => {
        setshow(!show)
    }

    // let redirect = (e) => {
    //     e.preventDefault()
    //     
    // }


    let submitData = (e) => {
        setloader(true)
        e.preventDefault()
        if (show) {
            let obj = {
                email: e.target.email.value,
                password: e.target.password.value
            }

            let firtletter = obj.email.charAt(0).toUpperCase()
            //   http://localhost:8000/admin/login  for local server
            axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/login`, obj) 
                .then((res) => res.data)
                .then((finalRes) => {
                    // console.log(finalRes);
                    setloader(false)
                    if (finalRes.status) {
                        sessionStorage.clear();
                        localStorage.setItem('token', finalRes.token)
                        localStorage.setItem('Fletter', firtletter)
                        const nameFromEmail = obj.email.split('@')[0];
                        const formattedAdminName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
                        const adminName = finalRes.name || formattedAdminName;
                        localStorage.setItem('adminName', adminName);

                        // Broadcast login to all open tabs for instant synchronization
                        broadcastAuthEvent({
                            type: 'AUTH_LOGIN',
                            token: finalRes.token,
                            name: adminName
                        });

                        toast.success(finalRes.message || "Login successful!")
                        e.target.reset()
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 800);
                    }
                    else {
                        toast.error(finalRes.message)
                        setloader(false)
                    }
                })
                .catch((err) => {
                    setloader(false);
                    toast.error(err.response?.data?.message || "Failed to log in. Please try again.");
                });
        }

        else {
            let obj = {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
            }


            axios.post(`https://my-portfolio-backend-2026.onrender.com/admin/registration`, obj)
                .then((res) => res.data)
                .then((finalRes) => {
                    // console.log(finalRes);
                    setloader(false)
                    if (finalRes.status) {
                        toast.success(finalRes.message)
                        e.target.reset()

                    }
                    else {
                        toast.error(finalRes.message)
                    }
                })

        }
    }



    return (
        <>
            {
                show && (

                    // login form

                    <div className="flex items-center justify-center md:min-h-screen h-[90vh]">
                        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 ">
                            {/* Left Side - Welcome Section */}

                            <div className="rounded-tl-lg rounded-bl-lg md:rounded-none rounded-[10px] bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
                                <img
                                    src="https://sales.webtel.in/images/Login-page-character1.png"
                                    alt="Admin Dashboard"
                                    className="w-64 h-64 object-cover rounded-lg mb-6 "
                                />
                                <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
                                <p className="text-center text-blue-100 text-lg">Manage your Portfolio efficiently</p>
                            </div>

                            {/* Right Side - Login Form */}
                            <div className="rounded-tr-lg rounded-br-lg md:rounded-none rounded-[10px]   shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

                                <div className='w-full flex flex-col items-center justify-center sm:hidden'>
                                    <img
                                        src="https://sales.webtel.in/images/Login-page-character1.png"
                                        alt="Admin Dashboard"
                                        className="w-full h-full object-cover"
                                    />
                                    <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
                                </div>
                                <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Login Here</h1>

                                <form onSubmit={submitData} className="space-y-4 p-5">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            name='email'
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            name='password'
                                            required
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full  flex justify-center items-center gap-8 bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        Login

                                        {
                                            loader && (
                                                <div class="w-7 h-7 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                                            )
                                        }
                                    </button>
                                </form>

                                {/* <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
                                    Don't have an account? <p className="text-blue-600 hover:underline">Sign Up Now</p>
                                </p> */}
                            </div>
                        </div>
                    </div>
                )
                // SignUp form

                // <div className="flex items-center justify-center min-h-screen bg-white">
                //     <div className="mx-auto  shadow-lg rounded-lg   grid grid-cols-1 md:grid-cols-2 ">
                //         {/* Left Side - Welcome Section */}
                //         <div className="rounded-tl-lg rounded-bl-lg bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
                //             <img
                //                 src="https://sales.webtel.in/images/Login-page-character1.png"
                //                 alt="Admin Dashboard"
                //                 className="w-64 h-64 object-cover rounded-lg mb-6 "
                //             />
                //             <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
                //             <p className="text-center text-blue-100 text-lg">Manage your Portfolio efficiently</p>
                //         </div>

                //         {/* Right Side - Login Form */}
                //         <div className="md:rounded-tr-lg md:rounded-br-lg rounded-lg shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

                //             <div className='w-full flex flex-col items-center justify-center sm:hidden'>
                //                 <img
                //                     src="https://sales.webtel.in/images/Login-page-character1.png"
                //                     alt="Admin Dashboard"
                //                     className="w-full h-full object-cover"
                //                 />
                //                 <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
                //             </div>
                //             <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up Now</h1>

                //             <form onSubmit={submitData} className="space-y-4 p-5">
                //                 <div>
                //                     <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                //                     <input
                //                         name='name'
                //                         required
                //                         type="text"
                //                         placeholder="Enter your name"
                //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                //                     />
                //                 </div>
                //                 <div>
                //                     <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                //                     <input
                //                         type="email"
                //                         name='email'
                //                         required
                //                         placeholder="Enter your email"
                //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                //                     />
                //                 </div>
                //                 <div>
                //                     <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                //                     <input
                //                         required
                //                         type="password"
                //                         name='password'
                //                         placeholder="Enter your password"
                //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                //                     />
                //                 </div>

                //                 <button
                //                     type="submit"
                //                     className="w-full  flex justify-center items-center gap-8  bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                //                 >
                //                     Sign In
                //                     {
                //                         loader && (
                //                             <div class="w-7 h-7 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
                //                         )
                //                     }

                //                 </button>
                //             </form>

                //             <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
                //                 Don't have an account? <p className="text-blue-600 hover:underline">Login Now</p>
                //             </p>
                //         </div>
                //     </div>
                // </div>
            }



        </>
    )
}
