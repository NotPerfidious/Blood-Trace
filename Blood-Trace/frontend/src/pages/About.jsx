/**
 * About Page
 * Describes the mission, features, and target audience of the Blood-Trace project.
 * Focuses on explaining the UI/UX design rationale for the visual donor locator.
 */
import logo from '../assets/images/logo.png'
import BloodTraceLogo from '../components/BloodTraceLogo'
import { Icon } from '@iconify/react'

function About() {
    return (
        <div className="w-full flex-col font-sans pb-16 bg-white">
            <div className="bg-[#D92D20] text-white w-full py-10 lg:py-7 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-white rounded-full p-2 mb-4">
                    <Icon icon="mdi:water-drop" className="w-10 h-10 text-[#D92D20]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Blood-Trace</h1>
                <h2 className="text-xl md:text-2xl font-medium mb-1 px-4 text-center">Visual Blood Donor Locator System</h2>
                <p className="text-base md:text-xl font-light px-4 text-center">Transforming emergency healthcare through thoughtful UI/UX design</p>
            </div>

            <div className="w-full max-w-5xl mx-auto px-4 mt-8 flex flex-col gap-12">
                <section className="mt-6 border border-gray-200 rounded-xl p-6 lg:p-8 bg-[#eeebebc7]">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Blood-Trace is a conceptual UI/UX-focused system designed to improve the experience of finding blood donors during medical emergencies.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Instead of text-heavy lists or scattered messages, Blood-Trace presents donor information on an interactive, map-based interface. Donors are displayed as color-coded pins, allowing users to quickly understand availability and proximity.
                    </p>
                </section>

                <section className='m-1'>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">The Problem We Address</h3>
                    <div className="bg-[#fcefef] border border-[#FFE0E0] rounded-xl p-6 lg:p-8">
                        <p className="text-gray-800 mb-6">
                            In emergency healthcare situations, finding a blood donor in Pakistan is often done through unstructured WhatsApp messages, phone calls, and social media posts. These methods create:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2 marker:text-[#f9baba]">
                            <li>Users must read long messages to identify donors</li>
                            <li>No visual sense of distance or location</li>
                            <li>Information is scattered and difficult to process quickly</li>
                            <li>High emotional stress increases the chance of user errors</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="bg-[#ebfef0] border border-[#E0FFE8] rounded-xl p-6">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">Medical-Minimalist UI</h4>
                                <Icon icon="mdi:pulse" className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Clean, distraction-free interface using Inter typeface. Maximum readability with reduced cognitive load during crisis situations.
                            </p>
                        </div>

                        <div className="bg-[#e9f3ff] border border-[#E0EFFF] rounded-xl p-6">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">Interactive Geolocation</h4>
                                <Icon icon="mdi:map-marker-outline" className="w-6 h-6 text-blue-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                High-contrast, color-coded donor pins on a dark map base. Green for exact matches, blue for universal donors, with instant distance calculations.
                            </p>
                        </div>

                        <div className="bg-[#ffebeb] border border-[#FFE0E0] rounded-xl p-6">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">One-Click Emergency Alert</h4>
                                <Icon icon="mdi:clock-outline" className="w-6 h-6 text-red-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Pulse-animated emergency button with maximum affordance. Send instant alerts to all compatible donors within your search radius.
                            </p>
                        </div>

                    </div>
                </section>

                <section>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Who We Serve</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                            <div>
                                <Icon icon="mdi:account-group" className="w-8 h-8 text-indigo-500 mb-4" />
                                <h4 className="font-bold text-lg mb-4">Primary Users</h4>
                            </div>
                            <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside marker:text-gray-400">
                                <li>Patient attendants during medical emergencies</li>
                                <li>Family members searching for urgent blood donors</li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                            <div>
                                <Icon icon="mdi:heart" className="w-8 h-8 text-pink-500 mb-4" />
                                <h4 className="font-bold text-lg mb-4">Secondary Users</h4>
                            </div>
                            <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside marker:text-gray-400">
                                <li>Volunteer blood donors</li>
                                <li>University students and young adults</li>
                            </ul>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    )
}

export default About
