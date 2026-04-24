import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'


function Navbar() {
    const [activeTab, setActiveTab] = useState('')

    const { isAuthenticated } = useSelector(state => state.auth);

    const checkIsAuthenticated = (e) => { // user clicking on nav button will have no effect
        if (!isAuthenticated) {
            e.preventDefault();
        }
    }

    return (

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


                <NavLink to="/about" onClick={checkIsAuthenticated} className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100")
                        : 'text-gray-400 cursor-default'} 
                `} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='mdi:about-circle-outline'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>About</div>
                    </div>
                </NavLink>

                <NavLink to="/help" onClick={checkIsAuthenticated} className={({ isActive }) => `p-1 px-2 rounded-sm 
                ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : "hover:bg-gray-100")
                        : 'text-gray-400 cursor-default'} 
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
                        <Icon
                            icon='lucide:bell'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
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

                    <NavLink to="/admin" onClick={checkIsAuthenticated} className={({ isActive }) => `flex justify-center items-center w-9 h-9 rounded-md transition-colors  
                    ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : 'hover:bg-gray-100')
                            : 'text-gray-400 cursor-default'}
                    `} title="Admin Dashboard">
                        <Icon icon='material-symbols:widgets-outline-rounded' className="w-5.5 h-5.5" />
                    </NavLink>

                    <NavLink to="/profile" onClick={checkIsAuthenticated} className={({ isActive }) => `flex justify-center items-center w-9 h-9 rounded-md transition-colors  
                    ${isAuthenticated ? (isActive ? 'bg-blood-primary text-white' : 'hover:bg-gray-100')
                            : 'text-gray-400 cursor-default'}
                    `} >
                        <Icon icon='iconamoon:profile' className="w-5.5 h-5.5" />
                    </NavLink>
                </div>

            </div>

        </nav>

    )
}


export default Navbar