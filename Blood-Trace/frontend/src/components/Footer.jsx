/**
 * Footer Component
 * Displays the application's brand information, quick links, resources,
 * and contact details. It also includes social-style saving lives message.
 */
import footerLogo from '../assets/images/footer-logo.png'
import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Footer() {

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const checkIsAuthenticated = (e) => { // user clicking on nav button will have no effect
        if (!isAuthenticated) {
            e.preventDefault();
        }
    }

    return (
        <div className="footer-container bg-footer-main text-footer-text p-2.5">

            <div className='flex justify-between items-start'>
                <div className='flex-col w-65'>

                    <NavLink to='/'>
                        <div className='flex'>
                            <BloodTraceLogo logo={footerLogo} dimensions='w-12 h-12' />
                            <div className='flex items-center'>Blood-Trace</div>
                        </div>
                    </NavLink>


                    <div className='text-[0.85rem] text-gray-400 mt-1 font-light'>
                        A visual blood donor locator system designed to
                        improve emergency healthcare response through
                        thoughtful UI/UX design.
                    </div>

                </div>

                <div className='flex flex-col  w-60 gap-2'>
                    <div className='flex items-center'>Quick Links</div>
                    <NavLink to="/dashboard" onClick={checkIsAuthenticated} className={
                        ({ isActive }) =>
                            isAuthenticated ? (isActive ? 'text-blood-primary' : ' text-gray-400') :
                                'text-gray-600 cursor-default'
                    }>
                        <div className='text-[0.87rem] font-light'>Find Donors</div>
                    </NavLink>

                    <NavLink to="/register-donor" onClick={checkIsAuthenticated} className={
                        ({ isActive }) =>
                            isAuthenticated ? (isActive ? 'text-blood-primary' : ' text-gray-400') :
                                'text-gray-600 cursor-default'
                    }>
                        <div className='text-[0.87rem] font-light'>Register As Donors</div>
                    </NavLink>
                    <NavLink to="/about" className={
                        ({ isActive }) =>
                            (isActive ? 'text-blood-primary' : ' text-gray-400')
                    }>
                        <div className='text-[0.87rem] font-light'>About Us</div>
                    </NavLink>


                    <NavLink to="/help" className={
                        ({ isActive }) =>
                            (isActive ? 'text-blood-primary' : ' text-gray-400')
                    }>
                        <div className='text-[0.87rem] font-light'>Help & FAQ</div>
                    </NavLink>
                </div>

                <div className='flex flex-col w-60 gap-2'>
                    <div className='flex items-center'>Resources</div>

                    <NavLink to="/notifications" onClick={checkIsAuthenticated} className={
                        ({ isActive }) =>
                            isAuthenticated ? (isActive ? 'text-blood-primary' : ' text-gray-400') :
                                'text-gray-600 cursor-default'
                    }>
                        <div className='text-[0.87rem] font-light'>Notifications</div>
                    </NavLink>

                    <NavLink to="/accessibility" className={
                        ({ isActive }) =>
                            (isActive ? 'text-blood-primary' : ' text-gray-400')
                    }>
                        <div className='text-[0.87rem] font-light'>Accessibility</div>
                    </NavLink>

                    <NavLink to="/profile" onClick={checkIsAuthenticated} className={
                        ({ isActive }) =>
                            isAuthenticated ? (isActive ? 'text-blood-primary' : ' text-gray-400') :
                                'text-gray-600 cursor-default'
                    }>
                        <div className='text-[0.87rem] font-light'>My Profile</div>
                    </NavLink>

                    {user?.role === 'admin' && (<NavLink to="/admin" onClick={checkIsAuthenticated} className={
                        ({ isActive }) =>
                            isAuthenticated ? (isActive ? 'text-blood-primary' : ' text-gray-400') :
                                'text-gray-600 cursor-default'
                    }>
                        <div className='text-[0.87rem] font-light'>Admin Dashboard</div>
                    </NavLink>)}

                </div>

                <div className='flex flex-col w-60 gap-2'>
                    <div className='flex items-center'>Contact Us</div>
                    <div className='text-[0.87rem] font-light text-gray-400 flex flex-row gap-1 items-center'>
                        <Icon
                            icon="lucide:phone"
                            className="w-4 h-4 text-blood-primary"
                        />
                        <div>+92 300 1234567</div>
                    </div>

                    <div className='text-[0.87rem] font-light text-gray-400 flex flex-row gap-1 items-center'>
                        <Icon
                            icon="material-symbols:mail-outline"
                            className="w-4 h-4 text-blood-primary"
                        />
                        <div>support@bloodtrace.pk</div>
                    </div>

                    <div className='text-[0.87rem] font-light text-gray-400 flex flex-row gap-1 items-center'>
                        <Icon
                            icon="akar-icons:location"
                            className="w-4 h-4 text-blood-primary"
                        />
                        <div>Lahore, Pakistan</div>
                    </div>
                    <div className='text-[0.87rem] font-light text-gray-400 flex flex-row gap-1 items-center'>
                        <Icon
                            icon="mdi:clock-outline"
                            className="w-4 h-4 text-blood-primary"
                        />
                        <div>24/7 Emergency Support</div>
                    </div>
                </div>

            </div>

            <div className='h-[0.5px] w-full mt-4 mb-4  bg-gray-800' />

            <div className='flex flex-row justify-between text-xs text-gray-400 mb-1 font-light'>
                <div className=''>
                    © 2026 Blood-Trace. A visual blood locator
                </div>

                <div className='flex flex-row items-center'>
                    Made with {' '}<Icon icon="mdi:heart" className='w-4 h-4 text-blood-primary mx-3px' /> {' '} for saving lives
                </div>
            </div>

        </div>
    )
}

export default Footer;