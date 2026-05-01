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
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const dispatch = useDispatch()

    const handleRegister = async (e) => {
        console.log('fhfhf')
        e.preventDefault();
        
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long');
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
        <div className="flex justify-center items-center font-sans mt-[-75px] pt-13 mb-[-20px] min-h-screen bg-[#f9f9f9]">
            <div className="w-full max-w-sm bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Create a password"
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
