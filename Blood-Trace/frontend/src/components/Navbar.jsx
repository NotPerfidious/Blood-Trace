import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'
import logo from '../assets/images/logo.png'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { resetAccessibility } from '../features/accessibility/accessibilitySlice';
import API from '../utils/API';


function Navbar() {
    const [activeTab, setActiveTab] = useState('')
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isPopping, setIsPopping] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) { setUnreadCount(0); return; }
        API.get('/notification/')
            .then(res => {
                const unread = res.data.notifications.filter(n => !n.isRead && ['Emergency', 'Requests', 'Info'].includes(n.type)).length;
                setUnreadCount(unread);
            })
            .catch(() => {});
    }, [isAuthenticated, location.pathname]);

    const checkIsAuthenticated = (e) => { // user clicking on nav button will have no effect
        if (!isAuthenticated) {
            e.preventDefault();
        }
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // user clicking on logout button
    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await API.post('/user/logout');

            setTimeout(() => {
                navigate('/');
                
                setTimeout(() => {
                    dispatch(logout());
                    dispatch(resetAccessibility());
                    setIsLoggingOut(false);
                }, 100);
                
            }, 2000);
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
        }
    };


    return (
        <>
        <nav className="navbar-container z-9999 fixed left-0 right-0 top-0 flex justify-between items-center p-[0.25] bg-white shadow-sm border-b border-gray-100">

            <NavLink to="/" className='cursor-pointer'>
                <div className='flex flex-row justify-center items-center'>
                    <BloodTraceLogo logo={logo} />
                    <div className='flex-col justify-center-safe'>
                        <div className='font-bold'>Blood-Trace</div>
                        <div className='text-xs text-gray-600 -mt-1'>Visual Donor Locator</div>
                    </div>
                </div>
            </NavLink>


            <div className='flex gap-5 justify-center items-center mr-8'>

                {/* <div className='flex items-center gap-3 border-r border-gray-300 pr-4 mr-2'>
                    <NavLink to="/login" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ""}`} >
                        <div className={`text-sm font-medium `}>Log In</div>
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : "text-blood-primary"}`} >
                        <div className={`text-sm font-medium `}>Sign Up</div>
                    </NavLink>
                </div> */}

                {!isAuthenticated && isPopping && (
                    <div className="fixed top-[70px] right-8 bg-white border-l-4 border-l-blood-primary border-y border-r border-gray-200 shadow-xl pr-12 pl-4 py-3 rounded-xl flex items-center gap-3 z-99999 transition-all">
                        <Icon icon="mdi:lock-outline" className="w-5 h-5 text-blood-primary" />
                        <span className="font-semibold text-gray-700 text-sm">Please Login / SignUp to access all features</span>

                        <button 
                            onClick={() => setIsPopping(false)} 
                            className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-full text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center"
                        >
                            <Icon icon="material-symbols:close" className="w-4.5 h-4.5" />
                        </button>
                    </div>
                )}


                <NavLink to="/dashboard" onClick={checkIsAuthenticated} className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100")
                        : 'text-gray-400 cursor-default'} 
                `} >
                    <div className={`text-sm font-medium `}>Find Donors</div>
                </NavLink>

                <NavLink to="/register-donor" onClick={checkIsAuthenticated} className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100")
                        : 'text-gray-400 cursor-default'} 
                `} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='mdi:register-outline'
                            className='mr-1 w-5.5 h-5.5'
                        />
                        <div className='text-sm font-medium'>Register</div>
                    </div>
                </NavLink>


                <NavLink to="/about" className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100"} 
                `} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='mdi:about-circle-outline'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>About</div>
                    </div>
                </NavLink>

                <NavLink to="/help" className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100"} 
                `}>
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='material-symbols:help-outline'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>Help</div>
                    </div>
                </NavLink>

                <NavLink to="/notifications" onClick={checkIsAuthenticated} className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100")
                        : 'text-gray-400 cursor-default'} 
                `} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <div className="relative">
                            <Icon
                                icon='lucide:bell'
                                className='mr-1 w-5.5 h-5.5'
                            />
                            {isAuthenticated && unreadCount > 0 && (
                                <span className="absolute -top-1.5 -right-0.5 bg-[#D92D20] text-white text-[0.55rem] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </div>
                        <div className='text-sm font-medium'>Notifications</div>
                    </div>
                </NavLink>

                <div className='flex items-center gap-2'>
                    <NavLink to="/accessibility" onClick={checkIsAuthenticated} className={({ isActive }) => `flex justify-center items-center w-9 h-9 rounded-md transition-colors  
                    ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : 'hover:bg-gray-100')
                            : 'text-gray-400 cursor-default'}
                    `} >
                        <Icon icon='meteor-icons:gear' className="w-5.5 h-5.5" />
                    </NavLink>

                    {user?.role === 'admin' && (<NavLink to="/admin" onClick={checkIsAuthenticated} className={({ isActive }) => `flex justify-center items-center w-9 h-9 rounded-md transition-colors  
                    ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : 'hover:bg-gray-100')
                            : 'text-gray-400 cursor-default'}
                    `} title="Admin Dashboard">
                        <Icon icon='material-symbols:widgets-outline-rounded' className="w-5.5 h-5.5" />
                    </NavLink>)}

                    <NavLink to="/profile" onClick={checkIsAuthenticated} className={({ isActive }) => `flex justify-center items-center w-9 h-9 rounded-md transition-colors  
                    ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : 'hover:bg-gray-100')
                            : 'text-gray-400 cursor-default'}
                    `} >
                        <Icon icon='iconamoon:profile' className="w-5.5 h-5.5" />
                    </NavLink>

                    {isAuthenticated && (
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="ml-2 flex justify-center items-center gap-1.5 p-1.5 px-3 rounded-md bg-red-100 text-blood-primary hover:bg-red-200 transition-colors font-medium text-sm cursor-pointer"
                        >
                            <Icon icon="solar:logout-2-outline" className="w-5 h-5" />
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>

        {isLoggingOut && (
            <div className="fixed top-10 right-10 bg-white border border-gray-200 shadow-xl px-6 py-4 rounded-xl flex items-center gap-4 z-99999 transition-all">
                <Icon icon="eos-icons:loading" className="w-6 h-6 text-blood-primary" />
                <span className="font-semibold text-gray-700 text-lg">Logging Out...</span>
            </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 transition-all animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100 opacity-100 animate-in zoom-in-95 duration-300 border border-gray-100">
                    <div className="p-8">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon icon="solar:logout-2-bold-duotone" className="w-10 h-10 text-blood-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Are you sure you want to log out?</h3>
                        
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => {
                                    setShowLogoutModal(false);
                                    handleLogout();
                                }}
                                className="w-full px-6 py-4 rounded-2xl bg-blood-primary text-white font-bold hover:bg-red-700 transition-all cursor-pointer shadow-xl shadow-red-200 active:scale-95"
                            >
                                Yes, Logout
                            </button>
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all cursor-pointer active:scale-95"
                            >
                                No, stay logged in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}


export default Navbar