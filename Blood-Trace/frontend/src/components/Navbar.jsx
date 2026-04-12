import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


function Navbar() {
    const [activeTab, setActiveTab] = useState('')
    return (

        <nav className="navbar-container z-999 fixed left-0 right-0 top-0 flex justify-between items-center p-[0.25] bg-white shadow-sm border-b border-gray-100">

            <NavLink to="/" className='cursor-pointer'>
                <div className='flex flex-row justify-center items-center'>
                    <BloodTraceLogo logo={logo} />
                    <div className='flex-col justify-center-safe'>
                        <div className='font-bold'>Blood-Trace</div>
                        <div className='text-xs text-gray-600 -mt-1'>Visual Donor Locator</div>
                    </div>
                </div>
            </NavLink>


            <div className='flex gap-6 justify-center items-center mr-8'>

                <div className='flex items-center gap-3 border-r border-gray-300 pr-4 mr-2'>
                    <NavLink to="/login" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ""}`} >
                        <div className={`text-sm font-medium `}>Log In</div>
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : "text-blood-primary"}`} >
                        <div className={`text-sm font-medium `}>Sign Up</div>
                    </NavLink>
                </div>

                <NavLink to="/dashboard" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ""}`} >
                    <div className={`text-sm font-medium `}>Find Donors</div>
                </NavLink>

                <NavLink to="/register-donor" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='mdi:register-outline'
                            className='mr-1 w-5.5 h-5.5'
                        />
                        <div className='text-sm font-medium'>Register</div>
                    </div>
                </NavLink>


                <NavLink to="/about" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='mdi:about-circle-outline'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>About</div>
                    </div>
                </NavLink>

                <NavLink to="/help" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`}>
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='material-symbols:help-outline'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>Help</div>
                    </div>
                </NavLink>

                <NavLink to="/notifications" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`} >
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='lucide:bell'
                            className='mr-1 w-5.5 h-5.5'
                        ></Icon>
                        <div className='text-sm font-medium'>Notifications</div>
                    </div>
                </NavLink>

                <div className='flex gap-2.5'>
                    <NavLink to="/accessibility" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`} >
                        {({ isActive }) => (
                            <div className='flex justify-center items-center gap-1.5 p-1'>
                                <Icon
                                    icon='meteor-icons:gear'
                                    className={`mr-1 w-5.5 h-5.5 ${isActive ? 'text-white' : 'text-black'}`}
                                />
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/admin" className={({ isActive }) => `flex justify-center items-center gap-1.5 transition-colors ${isActive ? 'text-[#D92D20]' : 'text-gray-800 hover:text-black'}`} title="Admin Dashboard">
                        <Icon
                            icon='material-symbols:widgets-outline-rounded'
                            className='mr-1 w-5.5 h-5.5'
                        />
                    </NavLink>

                    <NavLink to="/profile" className={({ isActive }) => `${isActive ? 'bg-blood-primary text-white p-1 px-2 rounded-sm' : ''}`} >
                        {({ isActive }) => (
                            <div className='flex justify-center items-center gap-1.5 p-1'>
                                <Icon
                                    icon='iconamoon:profile'
                                    className={`mr-1 w-5.5 h-5.5 ${isActive ? 'text-white' : 'text-black'}`}
                                />
                            </div>
                        )}
                    </NavLink>
                </div>

            </div>

        </nav>

    )
}


export default Navbar