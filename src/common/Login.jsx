// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import { toast } from 'react-toastify'
// import { broadcastAuthEvent, subscribeAuthEvents } from './authSync'
// import { API_BASE_URL } from '../config'

// export default function Login() {

//     let navigate = useNavigate()

//     let [show, setshow] = useState(true)

//     let [loader, setloader] = useState(false)

//     useEffect(() => {
//         // Cleanly dismiss any lingering toasts
//         toast.dismiss();
//         sessionStorage.clear();

//         // Check if an active valid session already exists, auto-redirect to dashboard
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const parts = token.split(".");
//                 if (parts.length >= 2) {
//                     const payload = JSON.parse(atob(parts[1]));
//                     if (payload?.exp && payload.exp * 1000 > Date.now()) {
//                         axios.get(`${API_BASE_URL}/admin/verify-token`, {
//                             headers: { Authorization: `Bearer ${token}` },
//                             timeout: 4000
//                         }).then((res) => {
//                             if (res.data?.status) {
//                                 window.location.href = '/dashboard';
//                             }
//                         }).catch(() => {});
//                     }
//                 }
//             } catch (_) {}
//         }

//         // Listen for login events from another tab (auto-sync without manual refresh)
//         const unsubscribe = subscribeAuthEvents((event) => {
//             if (event.type === 'AUTH_LOGIN') {
//                 toast.info("Logged in from another tab. Opening dashboard...", {
//                     position: "top-center",
//                     autoClose: 1500
//                 });
//                 setTimeout(() => {
//                     window.location.href = '/dashboard';
//                 }, 800);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     let showLoginSignUp = () => {
//         setshow(!show)
//     }

//     // let redirect = (e) => {
//     //     e.preventDefault()
//     //     
//     // }


//     let submitData = (e) => {
//         setloader(true)
//         e.preventDefault()
//         if (show) {
//             let obj = {
//                 email: e.target.email.value,
//                 password: e.target.password.value
//             }

//             let firtletter = obj.email.charAt(0).toUpperCase()
//             axios.post(`${API_BASE_URL}/admin/login`, obj) 
//                 .then((res) => res.data)
//                 .then((finalRes) => {
//                     // console.log(finalRes);
//                     setloader(false)
//                     if (finalRes.status) {
//                         sessionStorage.clear();
//                         localStorage.setItem('token', finalRes.token)
//                         localStorage.setItem('Fletter', firtletter)
//                         const nameFromEmail = obj.email.split('@')[0];
//                         const formattedAdminName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
//                         const adminName = finalRes.name || formattedAdminName;
//                         localStorage.setItem('adminName', adminName);

//                         // Broadcast login to all open tabs for instant synchronization
//                         broadcastAuthEvent({
//                             type: 'AUTH_LOGIN',
//                             token: finalRes.token,
//                             name: adminName
//                         });

//                         toast.success(finalRes.message || "Login successful!")
//                         e.target.reset()
//                         setTimeout(() => {
//                             window.location.href = '/dashboard';
//                         }, 800);
//                     }
//                     else {
//                         toast.error(finalRes.message)
//                         setloader(false)
//                     }
//                 })
//                 .catch((err) => {
//                     setloader(false);
//                     toast.error(err.response?.data?.message || "Failed to log in. Please try again.");
//                 });
//         }

//         else {
//             let obj = {
//                 name: e.target.name.value,
//                 email: e.target.email.value,
//                 password: e.target.password.value
//             }


//             axios.post(`${API_BASE_URL}/admin/registration`, obj)
//                 .then((res) => res.data)
//                 .then((finalRes) => {
//                     // console.log(finalRes);
//                     setloader(false)
//                     if (finalRes.status) {
//                         toast.success(finalRes.message)
//                         e.target.reset()

//                     }
//                     else {
//                         toast.error(finalRes.message)
//                     }
//                 })

//         }
//     }



//     return (
//         <>
//             {
//                 show && (

//                     // login form

//                     <div className="flex items-center justify-center md:min-h-screen h-[90vh]">
//                         <div className="mx-auto grid grid-cols-1 md:grid-cols-2 ">
//                             {/* Left Side - Welcome Section */}

//                             <div className="rounded-tl-lg rounded-bl-lg md:rounded-none rounded-[10px] bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
//                                 <img
//                                     src="https://sales.webtel.in/images/Login-page-character1.png"
//                                     alt="Admin Dashboard"
//                                     className="w-64 h-64 object-cover rounded-lg mb-6 "
//                                 />
//                                 <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
//                                 <p className="text-center text-blue-100 text-lg">Manage your Portfolio efficiently</p>
//                             </div>

//                             {/* Right Side - Login Form */}
//                             <div className="rounded-tr-lg rounded-br-lg md:rounded-none rounded-[10px]   shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

//                                 <div className='w-full flex flex-col items-center justify-center sm:hidden'>
//                                     <img
//                                         src="https://sales.webtel.in/images/Login-page-character1.png"
//                                         alt="Admin Dashboard"
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
//                                 </div>
//                                 <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Login Here</h1>

//                                 <form onSubmit={submitData} className="space-y-4 p-5">

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                                         <input
//                                             type="email"
//                                             required
//                                             name='email'
//                                             placeholder="Enter your email"
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                                         <input
//                                             type="password"
//                                             name='password'
//                                             required
//                                             placeholder="Enter your password"
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                         />
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         className="w-full  flex justify-center items-center gap-8 bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//                                     >
//                                         Login

//                                         {
//                                             loader && (
//                                                 <div class="w-7 h-7 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
//                                             )
//                                         }
//                                     </button>
//                                 </form>

//                                 {/* <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
//                                     Don't have an account? <p className="text-blue-600 hover:underline">Sign Up Now</p>
//                                 </p> */}
//                             </div>
//                         </div>
//                     </div>
//                 )
//                 // SignUp form

//                 // <div className="flex items-center justify-center min-h-screen bg-white">
//                 //     <div className="mx-auto  shadow-lg rounded-lg   grid grid-cols-1 md:grid-cols-2 ">
//                 //         {/* Left Side - Welcome Section */}
//                 //         <div className="rounded-tl-lg rounded-bl-lg bg-gradient-to-br from-blue-600 to-purple-700 p-12 sm:flex flex-col justify-center items-center text-white hidden">
//                 //             <img
//                 //                 src="https://sales.webtel.in/images/Login-page-character1.png"
//                 //                 alt="Admin Dashboard"
//                 //                 className="w-64 h-64 object-cover rounded-lg mb-6 "
//                 //             />
//                 //             <h2 className="text-4xl font-bold text-center mb-4">Welcome to Admin Dashboard</h2>
//                 //             <p className="text-center text-blue-100 text-lg">Manage your Portfolio efficiently</p>
//                 //         </div>

//                 //         {/* Right Side - Login Form */}
//                 //         <div className="md:rounded-tr-lg md:rounded-br-lg rounded-lg shadow-lg  bg-slate-200  md:p-12 flex flex-col justify-center sm:m-0 m-3">

//                 //             <div className='w-full flex flex-col items-center justify-center sm:hidden'>
//                 //                 <img
//                 //                     src="https://sales.webtel.in/images/Login-page-character1.png"
//                 //                     alt="Admin Dashboard"
//                 //                     className="w-full h-full object-cover"
//                 //                 />
//                 //                 <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center"> Welcome to Dashboard</h1>
//                 //             </div>
//                 //             <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up Now</h1>

//                 //             <form onSubmit={submitData} className="space-y-4 p-5">
//                 //                 <div>
//                 //                     <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                 //                     <input
//                 //                         name='name'
//                 //                         required
//                 //                         type="text"
//                 //                         placeholder="Enter your name"
//                 //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 //                     />
//                 //                 </div>
//                 //                 <div>
//                 //                     <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 //                     <input
//                 //                         type="email"
//                 //                         name='email'
//                 //                         required
//                 //                         placeholder="Enter your email"
//                 //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 //                     />
//                 //                 </div>
//                 //                 <div>
//                 //                     <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                 //                     <input
//                 //                         required
//                 //                         type="password"
//                 //                         name='password'
//                 //                         placeholder="Enter your password"
//                 //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 //                     />
//                 //                 </div>

//                 //                 <button
//                 //                     type="submit"
//                 //                     className="w-full  flex justify-center items-center gap-8  bg-gradient-to-br from-blue-600 to-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//                 //                 >
//                 //                     Sign In
//                 //                     {
//                 //                         loader && (
//                 //                             <div class="w-7 h-7 rounded-full animate-spin border-4 border-solid  border-white border-t-transparent shadow-md"></div>
//                 //                         )
//                 //                     }

//                 //                 </button>
//                 //             </form>

//                 //             <p className="cursor-pointer underline flex justify-center gap-3 text-center text-gray-600 mt-4 pb-5  text-sm" onClick={showLoginSignUp}>
//                 //                 Don't have an account? <p className="text-blue-600 hover:underline">Login Now</p>
//                 //             </p>
//                 //         </div>
//                 //     </div>
//                 // </div>
//             }



//         </>
//     )
// }

import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { broadcastAuthEvent, subscribeAuthEvents } from './authSync'
import { API_BASE_URL } from '../config'

const CHARACTER_IMG = 'https://sales.webtel.in/images/Login-page-character1.png'
const OTP_LEN = 6
const RESEND_SECONDS = 30
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const emptyOtp = () => Array(OTP_LEN).fill('')
const maskEmail = (e) => {
    const [u, d] = e.split('@')
    return d ? `${u.slice(0, 2)}***@${d}` : e
}

/* ---------- Mascot (the character above the form) ---------- */
function Mascot({ ok, no, look }) {
    const ref = useRef(null)
    const [ptr, setPtr] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (look) return
        const move = (e) => {
            if (!ref.current) return
            const r = ref.current.getBoundingClientRect()
            const dx = e.clientX - (r.left + r.width / 2)
            const dy = e.clientY - (r.top + r.height * 0.6)
            const a = Math.atan2(dy, dx)
            const d = Math.min(6, Math.hypot(dx, dy) / 30)
            setPtr({ x: Math.cos(a) * d, y: Math.sin(a) * d })
        }
        window.addEventListener('pointermove', move)
        return () => window.removeEventListener('pointermove', move)
    }, [look])

    const p = look || ptr
    const pupil = { transform: `translate(${p.x}px, ${p.y}px)` }

    return (
        <svg ref={ref} className="pk-mascot" viewBox="0 0 200 130" aria-hidden="true">
            <g className={`pk-mas ${ok ? 'pk-jump' : no ? 'pk-shake' : ''}`}>
                <circle className="pk-body" cx="100" cy="112" r="72" />
                <path className="pk-body" d="M60 58 L52 36 L76 48Z M140 58 L148 36 L124 48Z" />
                <circle className="pk-wh" cx="72" cy="78" r="17" fill="#fff" />
                <circle className="pk-wh" cx="128" cy="78" r="17" fill="#fff" />
                <circle className="pk-pp" cx="72" cy="78" r="7.5" fill="#1f2340" style={pupil} />
                <circle className="pk-pp" cx="128" cy="78" r="7.5" fill="#1f2340" style={pupil} />
                <ellipse cx="50" cy="98" rx="9" ry="5" fill="#ff4f6d" opacity=".4" />
                <ellipse cx="150" cy="98" rx="9" ry="5" fill="#ff4f6d" opacity=".4" />
                {ok
                    ? <path d="M82 96 Q100 122 118 96Z" fill="#7a2a1c" stroke="#1f2340" strokeWidth="3" strokeLinejoin="round" />
                    : <path d="M88 100 Q100 110 112 100" stroke="#1f2340" strokeWidth="4" fill="none" strokeLinecap="round" />}
                <ellipse className="pk-hd pk-hd-l" cx="72" cy="132" rx="20" ry="13" />
                <ellipse className="pk-hd" cx="128" cy="132" rx="20" ry="13" />
            </g>
        </svg>
    )
}

/* ---------- 6-box OTP input ---------- */
function OtpInput({ digits, setDigits, onFocus, onBlur, bad, disabled }) {
    const refs = useRef([])
    const empty = digits.every((d) => d === '')

    // focus the first box on mount and whenever the code is cleared
    useEffect(() => {
        if (empty) refs.current[0]?.focus()
    }, [empty])

    const fillFrom = (start, text) => {
        const next = [...digits]
        const chars = text.replace(/\D/g, '').slice(0, OTP_LEN - start).split('')
        chars.forEach((c, k) => { next[start + k] = c })
        setDigits(next)
        refs.current[Math.min(start + chars.length, OTP_LEN - 1)]?.focus()
    }

    const handleChange = (i, value) => {
        const clean = value.replace(/\D/g, '')
        if (!clean) {
            const next = [...digits]
            next[i] = ''
            setDigits(next)
            return
        }
        fillFrom(i, clean) // handles one digit, many digits, and SMS autofill
    }

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !digits[i] && i > 0) {
            e.preventDefault()
            const next = [...digits]
            next[i - 1] = ''
            setDigits(next)
            refs.current[i - 1]?.focus()
        } else if (e.key === 'ArrowLeft' && i > 0) {
            refs.current[i - 1]?.focus()
        } else if (e.key === 'ArrowRight' && i < OTP_LEN - 1) {
            refs.current[i + 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        fillFrom(0, e.clipboardData.getData('text'))
    }

    return (
        <div className={`pk-otp ${bad ? 'pk-bad' : ''}`} onPaste={handlePaste}>
            {digits.map((d, i) => (
                <input
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    className={d ? 'pk-filled' : ''}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    aria-label={`Digit ${i + 1} of ${OTP_LEN}`}
                    value={d}
                    disabled={disabled}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={(e) => { e.target.select(); onFocus() }}
                    onBlur={onBlur}
                />
            ))}
        </div>
    )
}

/* ---------- Login / Register / Forgot / OTP page ---------- */
export default function Login() {

    const navigate = useNavigate()

    let [mode, setMode] = useState('login') // 'login' | 'register' | 'forgot' | 'otp'
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [otp, setOtp] = useState(emptyOtp())
    let [resendIn, setResendIn] = useState(0)
    let [showPw, setShowPw] = useState(false)
    let [focus, setFocus] = useState(null) // 'name' | 'email' | 'password' | 'otp' | null
    let [loader, setloader] = useState(false)
    let [ok, setOk] = useState(false)
    let [shake, setShake] = useState(false)
    const timers = useRef([])

    const code = otp.join('')
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    const oops = () => { setShake(true); later(() => setShake(false), 600) }

    const copy = {
        login: { title: 'Login Here', lead: 'Enter your details to open the dashboard.', btn: 'Countinue' },
        register: { title: 'Create Account', lead: 'Sign up to manage your portfolio.', btn: 'Register' },
        forgot: { title: 'Forgot Password?', lead: 'Enter your email and we’ll send you a reset link.', btn: 'Send reset link' },
        otp: { title: 'Verify it’s you', lead: `We sent a 6-digit code to ${maskEmail(email)}.`, btn: 'Verify & Login' },
    }

    const switchMode = (m) => {
        setMode(m)
        setPassword('')
        setShowPw(false)
        setFocus(null)
        setOtp(emptyOtp())
        if (m === 'login') setName('')
    }

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
                        axios.get(`${API_BASE_URL}/admin/verify-token`, {
                            headers: { Authorization: `Bearer ${token}` },
                            timeout: 4000
                        }).then((res) => {
                            if (res.data?.status) {
                                navigate('/dashboard');
                            }
                        }).catch(() => { });
                    }
                }
            } catch (_) { }
        }

        // Listen for login events from another tab (auto-sync without manual refresh)
        const unsubscribe = subscribeAuthEvents((event) => {
            if (event.type === 'AUTH_LOGIN') {
                toast.info("Logged in from another tab. Opening dashboard...", {
                    position: "top-center",
                    autoClose: 1500
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 800);
            }
        });

        return () => {
            unsubscribe();
            timers.current.forEach(clearTimeout);
        };
    }, []);

    // resend countdown
    useEffect(() => {
        if (mode !== 'otp' || resendIn <= 0) return
        const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
        return () => clearTimeout(t)
    }, [mode, resendIn])

    // auto-verify when all 6 digits are filled
    useEffect(() => {
        if (mode === 'otp' && code.length === OTP_LEN && !loader && !ok) {
            verifyOTP()
        }
    }, [code])

    /* ---------- finish login (used by password login AND by OTP verify) ---------- */
    const completeLogin = (finalRes) => {
        let firtletter = email.charAt(0).toUpperCase()
        sessionStorage.clear();
        localStorage.setItem('token', finalRes.token)
        localStorage.setItem('Fletter', firtletter)
        const nameFromEmail = email.split('@')[0];
        const formattedAdminName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        const adminName = finalRes.name || formattedAdminName;
        localStorage.setItem('adminName', adminName);
        if (finalRes.is2Factor !== undefined) {
            localStorage.setItem('isToggle', String(!!finalRes.is2Factor));
        } else if (mode === 'otp') {
            localStorage.setItem('isToggle', 'true');
        }

        // Broadcast login to all open tabs for instant synchronization
        broadcastAuthEvent({
            type: 'AUTH_LOGIN',
            token: finalRes.token,
            name: adminName
        });

        setOk(true)
        setFocus(null)
        toast.success(finalRes.message)
        setEmail('')
        setPassword('')
        setOtp(emptyOtp())
        setTimeout(() => {
            navigate('/dashboard');
        }, 800);
    }

    /* ---------- LOGIN ---------- */
    const loginUser = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/admin/login`, { email, password })
            const finalRes = res.data
            if (finalRes.status) {
                if (finalRes.is2Factor) {
                    await sendOTP(email)
                    setMode("otp")
                    setResendIn(30)
                    setloader(false)
                } else {
                    setloader(false)
                    completeLogin(finalRes)
                }
            } else {
                setloader(false)
                toast.error(finalRes.message)
                oops()
            }
        } catch (err) {
            setMode("login")
            setloader(false)
            toast.error(err.response?.data?.message)
            oops()
        }
    }

    /* ---------- SEND & VERIFY OTP ---------- */
    const sendOTP = async (targetEmail) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/send-otp`, { email: targetEmail })
            const data = response.data
            if (data.status) {
                toast.success(data.message)
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (err) {
            setMode("login") 
            toast.error(err.response?.data?.message || err.message || "Failed to send OTP")

            return false
        }
    }

    const resendOtp = async () => {
        if (resendIn > 0 || loader) return
        setOtp(emptyOtp())
        setloader(true)
        const sent = await sendOTP(email)
        setloader(false)
        if (sent) {
            setResendIn(30)
        }
    }

    const verifyOTP = async () => {
        if (code.length < OTP_LEN) {
            toast.error('Please enter the 6-digit code.')
            oops()
            setloader(false)
            return
        }
        setloader(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/verify-otp`, { email, otp: code })
            const data = response.data
            setloader(false)
            if (data.status) {
                completeLogin(data)
            } else {
                toast.error(data.message || "Invalid OTP code.")
                oops()
                setOtp(emptyOtp())
            }
        } catch (err) {
            setloader(false)
            toast.error(err.response?.data?.message || err.message || "Failed to verify OTP.")
            oops()
            setOtp(emptyOtp())
        }
    }




    /* ---------- REGISTER ---------- */
    const registerUser = () => {
        axios.post(`${API_BASE_URL}/admin/registration`, { name, email, password })
            .then((res) => res.data)
            .then((finalRes) => {
                setloader(false)
                if (finalRes.status) {
                    toast.success(finalRes.message || "Account created! Please log in.")
                    switchMode('login')   // keeps the email so they can log in right away
                } else {
                    toast.error(finalRes.message)
                    oops()
                }
            })
            .catch((err) => {
                setloader(false)
                toast.error(err.response?.data?.message || "Registration failed. Please try again.")
                oops()
            })
    }

    /* ---------- FORGOT PASSWORD ---------- */
    const forgotPassword = () => {
        axios.post(`${API_BASE_URL}/admin/forgot-password`, { email })
            .then((res) => res.data)
            .then((finalRes) => {
                setloader(false)
                if (finalRes.status) {
                    toast.success(finalRes.message || "Reset link sent. Please check your email.")
                    switchMode('login')
                } else {
                    toast.error(finalRes.message)
                    oops()
                }
            })
            .catch((err) => {
                setloader(false)
                toast.error(err.response?.data?.message || "Could not send reset link. Please try again.")
                oops()
            })
    }

    let submitData = (e) => {
        e.preventDefault()
        if (loader) return
        setloader(true)
        if (mode === 'login') loginUser()
        else if (mode === 'register') registerUser()
        else if (mode === 'forgot') forgotPassword()
        else if (mode === "otp") verifyOTP()
        else setloader(false) // otp mode - UI only, no API
    }

    const shy = focus === 'password' && !ok
    const typed = focus === 'name' ? name : email
    const look = ok
        ? { x: 0, y: 2 }
        : focus === 'otp'
            ? { x: clamp((Math.min(code.length, OTP_LEN - 1) - 2.5) * 2.4, -6, 6), y: 4 } // eyes follow the boxes
            : (focus === 'email' || focus === 'name')
                ? { x: clamp((typed.length - 12) * 0.6, -6, 6), y: 4 }
                : focus === 'password'
                    ? (showPw ? { x: 5, y: 2 } : { x: 0, y: 0 })
                    : null

    return (
        <div className="pk-page">
            <span className="pk-dot pk-dot1" />
            <span className="pk-dot pk-dot2" />

            <div className="pk-shell">
                {/* Left side - your character image */}
                <aside className="pk-left">
                    <img src={CHARACTER_IMG} alt="Admin Dashboard" />
                    <h2>Welcome to Admin Dashboard</h2>
                    <p>Manage your Portfolio efficiently</p>
                </aside>

                {/* Right side - mascot + form */}
                <section className={`pk-right ${shy ? 'pk-shy' : ''} ${shy && showPw ? 'pk-peek' : ''} ${ok ? 'pk-ok' : ''}`}>
                    <Mascot ok={ok} no={shake} look={look} />

                    <h1>{ok ? 'Welcome back!' : copy[mode].title}</h1>
                    <p className="pk-lead">{copy[mode].lead}</p>

                    <form key={mode} className="pk-fade" onSubmit={submitData}>

                        {mode === 'otp' ? (
                            <>
                                <OtpInput
                                    digits={otp}
                                    setDigits={setOtp}
                                    bad={shake}
                                    disabled={loader || ok}
                                    onFocus={() => setFocus('otp')}
                                    onBlur={() => setFocus(null)}
                                />
                                <p className="pk-resend">
                                    {resendIn > 0 ? (
                                        <>Didn’t get the code? Resend in <b>0:{String(resendIn).padStart(2, '0')}</b></>
                                    ) : (
                                        <>Didn’t get the code? <button type="button" className="pk-link" onClick={resendOtp}>Resend code</button></>
                                    )}
                                </p>
                            </>
                        ) : (
                            <>
                                {mode === 'register' && (
                                    <div className="pk-f">
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            required
                                            placeholder=" "
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={() => setFocus('name')}
                                            onBlur={() => setFocus(null)}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                )}

                                <div className="pk-f">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder=" "
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocus('email')}
                                        onBlur={() => setFocus(null)}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                {mode !== 'forgot' && (
                                    <div className="pk-f">
                                        <input
                                            id="password"
                                            type={showPw ? 'text' : 'password'}
                                            name="password"
                                            required
                                            minLength={mode === 'register' ? 6 : undefined}
                                            placeholder=" "
                                            autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setFocus('password')}
                                            onBlur={() => setFocus(null)}
                                        />
                                        <label htmlFor="password">Password</label>
                                        <button
                                            type="button"
                                            className="pk-eye"
                                            aria-label={showPw ? 'Hide password' : 'Show password'}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => setShowPw((s) => !s)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                {showPw ? (
                                                    <>
                                                        <path d="M17.94 17.94A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                                                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                {mode === 'login' && (
                                    <div className="pk-row">
                                        <button type="button" className="pk-link" onClick={() => switchMode('forgot')}>
                                            Forgot password?
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button type="submit" className={`pk-btn ${ok ? 'pk-btn-ok' : ''}`} disabled={loader || ok}>
                            {ok ? 'Success' : copy[mode].btn}
                            {loader && <span className="pk-spin" />}
                        </button>
                    </form>

                    <p className="pk-switch">
                        {mode === 'login' && (
                            <>Don’t have an account? <button type="button" className="pk-link" onClick={() => switchMode('register')}>Register</button></>
                        )}
                        {mode === 'register' && (
                            <>Already have an account? <button type="button" className="pk-link" onClick={() => switchMode('login')}>Login</button></>
                        )}
                        {(mode === 'forgot' || mode === 'otp') && (
                            <button type="button" className="pk-link" onClick={() => switchMode('login')}>← Back to login</button>
                        )}
                    </p>
                </section>
            </div>
        </div>
    )
}