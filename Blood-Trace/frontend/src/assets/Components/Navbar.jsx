import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom'


function Navbar() {
    return (

        <nav  className="navbar-container z-999 fixed left-0 right-0 top-0 flex justify-between items-center p-[0.25] bg-white">

            <Link to="/" className='cursor-pointer'>
                <div className='flex flex-row justify-center items-center'>
                    <BloodTraceLogo logo={logo} />
                    <div className='flex-col justify-center-safe'>
                        <div className='font-bold'>Blood-Trace</div>
                        <div className='text-xs text-gray-600 -mt-1'>Visual Donor Locator</div>
                    </div>
                </div>
            </Link>


            <div className='flex gap-6 justify-center items-center'>

                <Link to="/dashboard">
                    <div className='text-sm font-medium'>Find Donors</div>
                </Link>


                <div className='flex justify-center items-center gap-1.5'>
                    <Icon
                        icon='mdi:register-outline'
                        className='text-black mr-1 w-5.5 h-5.5'
                    ></Icon>
                    <div className='text-sm font-medium'>Register</div>
                </div>

                <div className='flex justify-center items-center gap-1.5'>
                    <Icon
                        icon='mdi:about-circle-outline'
                        className='text-black mr-1 w-5.5 h-5.5'
                    ></Icon>
                    <div className='text-sm font-medium'>About</div>
                </div>

                <div className='flex justify-center items-center gap-1.5'>
                    <Icon
                        icon='material-symbols:help-outline'
                        className='text-black mr-1 w-5.5 h-5.5'
                    ></Icon>
                    <div className='text-sm font-medium'>Help</div>
                </div>

                <div className='flex justify-center items-center gap-1.5'>
                    <Icon
                        icon='lucide:bell'
                        className='text-black mr-1 w-5.5 h-5.5'
                    ></Icon>
                    <div className='text-sm font-medium'>Notifications</div>
                </div>

                <div className='flex gap-2.5'>
                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='meteor-icons:gear'
                            className='text-black mr-1 w-5.5 h-5.5'
                        />
                    </div>

                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='material-symbols:widgets-outline-rounded'
                            className='text-black mr-1 w-5.5 h-5.5'
                        />
                    </div>

                    <div className='flex justify-center items-center gap-1.5'>
                        <Icon
                            icon='iconamoon:profile'
                            className='text-black mr-1 w-5.5 h-5.5'
                        />
                    </div>
                </div>

            </div>

        </nav>

    )
}


export default Navbar