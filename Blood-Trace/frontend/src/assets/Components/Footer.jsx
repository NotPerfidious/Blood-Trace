import footerLogo from '../Images/footer-logo.png'
import BloodTraceLogo from './BloodTraceLogo.jsx'
import { Icon } from '@iconify/react'

function Footer() {
    return (
        <div className="footer-container bg-footer-main text-footer-text p-2.5">

            <div className='flex justify-between items-start'>
                <div className='flex-col w-65'>
                    <div className='flex'>
                        <BloodTraceLogo logo={footerLogo} dimensions='w-12 h-12' />
                        <div className='flex items-center'>Blood-Trace</div>
                    </div>

                    <div className='text-[0.85rem] text-gray-400 mt-1 font-light'>
                        A visual blood donor locator system designed to
                        improve emergency healthcare response
                        through thoughtful UI/UX design.
                    </div>

                </div>

                <div className='flex flex-col  w-60 gap-2'>
                    <div className='flex items-center'>Quick Links</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Find donors</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Register as Donors</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>About us</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Help & FAQ</div>
                </div>

                <div className='flex flex-col w-60 gap-2'>
                    <div className='flex items-center'>Resources</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Accessibility</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Admin Dashboard</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>My Profile</div>
                    <div className='text-[0.87rem] font-light text-gray-400'>Admin Dashboard</div>
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
                        <div>Lahore Pakistan</div>
                    </div>
                </div>

            </div>

            <div className='h-[0.5px] w-full mt-10 mb-5  bg-gray-800'/>

            <div className='flex flex-row justify-between text-xs text-gray-400 mb-3 font-light'>
                <div className=''>
                    © 2026 Blood-Trace. A visual blood locator
                </div>

                <div className='flex flex-row items-center'>
                   made with {' '}<Icon icon="mdi:heart" className='w-4 h-4 text-blood-primary mx-3px'/> {' '} for saving lives
                </div>
            </div>

        </div>
    )
}

export default Footer;