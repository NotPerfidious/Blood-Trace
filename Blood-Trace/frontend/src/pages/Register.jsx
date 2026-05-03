/**
 * Registration Page
 * Allows new users to create an account by providing an email and password.
 * Handles validation and interacts with the backend to register the user.
 */
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { setIsAuthenticated, setUser, setLoading } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import API from '../utils/API';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const dispatch = useDispatch()

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match');
            return;
        }
        try {

            const response = await API.post('/user/register', {
                email,
                password
            });

            console.log(response);

            if (response.data.message === 'Registration successful') {

                dispatch(setIsAuthenticated(true));
                dispatch(setLoading(false));
                dispatch(setUser(response.data.user));

                setSuccessMsg(true);
                setTimeout(() => {
                    const role = response.data.user?.role;
                    navigate(role === 'admin' ? '/admin' : '/dashboard');
                }, 1500);
            }

        } catch (error) {

            if (error.response) {
                if (error.response.data?.message === 'This email is already in use') {
                    setErrorMsg('This email is already in use');
                }
                 else {
                setErrorMsg(error.response.data?.message || "Something went wrong");
            }
            }
            else {
                console.log(`[ERROR]: ${error}`)
            }

        }

    };

    return (
        <div className="relative overflow-hidden flex justify-center items-center font-sans mt-[-75px] pt-13 mb-[-5px] min-h-screen bg-[#f9f9f9]">
            
            {/* Ribbon (Template) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex justify-center items-center z-0">
                <svg className="absolute w-[200%] min-w-[1200px] opacity-[0.15] transform rotate-10deg drop-shadow-2xl" viewBox="0 0 1000 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,150 C250,300 350,0 600,150 C850,300 1000,50 1000,50 L1000,120 C850,270 750,-30 500,120 C250,270 150,-30 0,120 Z" fill="#b91c1c" fillOpacity="0.7" />
                    <path d="M0,200 C250,350 350,50 600,200 C850,350 1000,100 1000,100 L1000,250 C850,400 750,100 500,250 C250,400 150,100 0,250 Z" fill="#D92D20" />
                    <path d="M0,250 C200,400 400,100 700,250 C900,350 1000,200 1000,200 L1000,270 C900,420 600,120 400,270 C200,420 100,120 0,270 Z" fill="#fca5a5" fillOpacity="0.5" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur-md p-8 border border-red-50 rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Create Account</h1>

                {successMsg && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm text-center">
                        Registration Successful! Redirecting...
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);

                                if(errorMsg)
                                    setErrorMsg(false);
                            }}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if(errorMsg) setErrorMsg(false);
                            }}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Create a password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if(errorMsg) setErrorMsg(false);
                            }}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D92D20] text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
                    >
                        Sign Up
                    </button>

                    {errorMsg && (<div className='text-blood-primary flex gap-2 font-medium items-center text-[0.95rem]'>
                        <Icon icon='mdi:about-circle-outline' className='h-5 w-5' />
                        <div>{errorMsg}</div>
                    </div>)}
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already registered?{' '}
                    <Link to="/login" className="text-[#D92D20] font-semibold hover:underline">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
