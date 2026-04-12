import { useState } from 'react'
import { Icon } from '@iconify/react'
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

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index)
    }

    return (
        <div className="min-h-screen">

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
            <div className="bg-gray-100 py-10 mb-0">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                        Still Need Help?
                    </h2>
                    <p className="text-gray-500 text-[0.85rem] text-center mb-8">
                        Our support team is here to assist you with any questions or issues.
                    </p>

                    <div className="grid grid-cols-3 gap-5">

                        {/* Call Us */}
                        <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-blood-primary transition-colors duration-300">
                                <Icon
                                    icon="lucide:phone"
                                    className="w-6 h-6 text-blood-primary group-hover:text-white transition-colors duration-300"
                                />
                            </div>
                            <div className="font-semibold text-[0.9rem] text-gray-800">Call Us</div>
                            <div className="text-[0.8rem] text-gray-500">+92 300 1234567</div>
                        </div>

                        {/* Email Us */}
                        <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-blood-primary transition-colors duration-300">
                                <Icon
                                    icon="material-symbols:mail-outline"
                                    className="w-6 h-6 text-blood-primary group-hover:text-white transition-colors duration-300"
                                />
                            </div>
                            <div className="font-semibold text-[0.9rem] text-gray-800">Email Us</div>
                            <div className="text-[0.8rem] text-gray-500">support@bloodtrace.pk</div>
                        </div>

                        {/* Live Chat */}
                        <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-blood-primary transition-colors duration-300">
                                <Icon
                                    icon="mdi:chat-outline"
                                    className="w-6 h-6 text-blood-primary group-hover:text-white transition-colors duration-300"
                                />
                            </div>
                            <div className="font-semibold text-[0.9rem] text-gray-800">Live Chat</div>
                            <div className="text-[0.8rem] text-gray-500">Available 24/7</div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Help
