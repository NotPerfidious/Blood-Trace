/**
 * Help & Support Page
 * Provides a comprehensive FAQ section and a quick start guide for users.
 * Includes an email support feature that adapts based on authentication status.
 */
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import helpLogo from '../assets/images/help-logo.png'

const faqData = [
    {
        question: 'How do I find blood donors near me?',
        answer: 'Use the map-based interface on the homepage. Select your required blood type from the filter panel, adjust the radius slider to set your search area, and donors will appear as colored pins. Green pins show exact blood type matches, blue shows compatible donors, and red shows unavailable donors.'
    },
    {
        question: 'What do the different pin colors mean?',
        answer: 'Green pins indicate exact blood type matches that are available. Blue pins show universal or compatible blood group donors. Yellow pins indicate a donor is not currently available or have recently donated.'
    },
    {
        question: 'How does the Emergency Broadcast feature work?',
        answer: 'The Emergency Broadcast feature uses location notifications (SMS, push, and email) to all compatible donors within your selected radius. Use this feature only for genuine emergencies. You will see how many donors will be notified before confirming.'
    },
    {
        question: 'How often is donor data updated?',
        answer: 'You must wait at least 90 days (3 months) between blood donations. Your profile will automatically track this and show your status as available or not. Profiles are regularly updated to reflect the most current availability.'
    },
    {
        question: 'How do I register as a donor?',
        answer: 'Click the "Register" button at the navigation bar. Fill in your personal information, blood type, location, and availability. Once registered, you will start receiving notifications when someone nearby needs your blood type.'
    },
    {
        question: 'What information is shared with people requesting blood?',
        answer: 'Only your name, blood type, general location (not exact), and contact number are shared with verified emergency requests. Your exact address and other personal details remain private.'
    },
    {
        question: 'How do I contact a donor?',
        answer: 'Click on any donor pin on the map to view their profile. You will see options to Call, Message via WhatsApp, or Send a Direct Request. Always be respectful when contacting donors.'
    },
    {
        question: 'What are Blood Type compatibility rules?',
        answer: 'O- is the universal donor and can donate to anyone. AB+ is the universal recipient and can receive from anyone. The system automatically shows you compatible donors based on standard compatibility rules.'
    },
    {
        question: 'How do I turn on accessibility features?',
        answer: 'Visit the Accessibility Settings page from the navigation menu. You can enable high-contrast mode, adjust font size, enable screen reader-friendly layouts, and choose keyboard navigation.'
    }
]

const quickStartSteps = [
    {
        number: 1,
        title: 'Find Donors',
        description: 'Go to the Dashboard, select your blood type, and view nearby donors on the map.',
        icon: 'mdi:map-search-outline',
        color: 'bg-red-100 text-blood-primary'
    },
    {
        number: 2,
        title: 'View Donor Details',
        description: "Click on any pin to see the donor's profile with contact information.",
        icon: 'mdi:account-details-outline',
        color: 'bg-blue-100 text-blue-600'
    },
    {
        number: 3,
        title: 'Contact Donor',
        description: 'Use Call, WhatsApp, or Direct Request buttons to reach out to the donor.',
        icon: 'mdi:phone-message-outline',
        color: 'bg-green-100 text-green-600'
    },
    {
        number: 4,
        title: 'Emergency Requests',
        description: 'For urgent needs, use the Emergency Request button to notify all compatible donors at once.',
        icon: 'mdi:alert-octagram-outline',
        color: 'bg-amber-100 text-amber-600'
    }
]

function FAQItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center py-4 text-left cursor-pointer group"
            >
                <span className="text-[0.9rem] font-semibold text-gray-800 group-hover:text-blood-primary transition-colors duration-200">
                    {question}
                </span>
                <Icon
                    icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                    className={`w-5 h-5 shrink-0 ml-4 transition-colors duration-200 ${isOpen ? 'text-blood-primary' : 'text-gray-400'}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 pb-4' : 'max-h-0'}`}
            >
                <p className="text-[0.85rem] text-gray-600 leading-relaxed pr-8">
                    {answer}
                </p>
            </div>
        </div>
    )
}


function Help() {
    const [openFAQ, setOpenFAQ] = useState(null)
    const [guestEmail, setGuestEmail] = useState('')
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index)
    }

    const handleEmailClick = (e) => {
        // If it's a guest and they haven't entered an email, we could still let them click, 
        // but it's better to use the entered email if provided.
        // For authenticated users, we use their registered email.
        const fromEmail = isAuthenticated ? user?.email : guestEmail;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=support@bloodtrace.pk${fromEmail ? `&from=${fromEmail}` : ''}`;
        
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="min-h-screen bg-[#f9f9f9]">

            {/* Hero Section */}
            <div className="flex flex-col items-center py-10 gap-3">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-md">
                    <img src={helpLogo} alt="Help & Support" className="w-16 h-16 object-contain rounded-full bg-blood-primary" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Help & Support
                </h1>

                <p className="text-gray-500 text-[0.9rem]">
                    Find answers to common questions about Blood-Trace.
                </p>
            </div>


            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto px-6 pb-10">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                        Frequently Asked Questions
                    </h2>

                    <div>
                        {faqData.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openFAQ === index}
                                onToggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {/* Quick Start Guide */}
            <div className="max-w-3xl mx-auto px-6 pb-10">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
                        Quick Start Guide
                    </h2>
                    <p className="text-gray-500 text-[0.85rem] text-center mb-6">
                        Get started with Blood-Trace in four simple steps
                    </p>

                    <div className="flex flex-col gap-5">
                        {quickStartSteps.map((step) => (
                            <div key={step.number} className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${step.color}`}>
                                    <span className="font-bold text-[0.9rem]">{step.number}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-[0.95rem] font-semibold text-gray-800">
                                        {step.title}
                                    </h3>
                                    <p className="text-[0.83rem] text-gray-500 mt-0.5">
                                        {step.description}
                                    </p>
                                </div>

                                <Icon
                                    icon={step.icon}
                                    className={`w-6 h-6 shrink-0 mt-1 ${step.color.split(' ')[1]}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Still Need Help Section */}
            <div className="bg-gray-100 py-12 mb-0">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Still Need Help?
                    </h2>
                    <p className="text-gray-500 text-[0.9rem] text-center mb-10">
                        Our support team is here to assist you with any questions or issues.
                    </p>

                    <div className="flex justify-center">

                        {/* Email Us Card */}
                        <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center gap-6 shadow-xl border border-gray-100 max-w-md w-full transition-all duration-300">
                            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
                                <Icon
                                    icon="material-symbols:mail-outline"
                                    className="w-12 h-12 text-blood-primary"
                                />
                            </div>
                            
                            <div className="text-center w-full">
                                <h3 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">Email Support</h3>
                                <p className="text-gray-500 text-[0.9rem] mb-8 font-medium">Reach out to us at <span className="text-blood-primary font-bold">support@bloodtrace.pk</span></p>

                                {!isAuthenticated && (
                                    <div className="w-full mb-6">
                                        <label className="block text-left text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Email Address</label>
                                        <input 
                                            type="email" 
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            placeholder="Enter your email to send from..."
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-blood-primary/30 focus:bg-white transition-all text-[0.95rem] text-gray-700 font-medium"
                                        />
                                    </div>
                                )}

                                <button 
                                    onClick={handleEmailClick}
                                    className="w-full bg-blood-primary text-white font-bold text-[1.1rem] py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                                >
                                    <span>Send Email</span>
                                    <Icon icon="lucide:arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {isAuthenticated && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-[0.8rem] text-gray-400 font-medium">
                                        <Icon icon="mdi:check-circle" className="text-green-500 w-4 h-4" />
                                        <span>Mailing as <span className="text-gray-600 font-bold">{user.email}</span></span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Help
