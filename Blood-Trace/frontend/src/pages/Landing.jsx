/**
 * Landing Page
 * The introductory page for the application. Highlights key metrics, features,
 * and the problem-solving approach of the Blood-Trace system.
 */
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {

    const { isAuthenticated , user} = useSelector((state) => state.auth);

    //console.log(user);

    return (

        <div className="">

            <div className="flex flex-col gap-5 pb-5 items-center bg-[#ffffff]">
                <div className="w-70 h-11 flex flex-row justify-center items-center gap-3 mt-8 text-xs bg-[#f9e4e4] text-blood-primary p-1 rounded-3xl pr-2">

                    <Icon
                        icon="material-symbols-light:bolt-outline-rounded"
                        className="w-6 h-6"
                    >

                    </Icon>
                    <div className="text-sm">
                        Emergency Response Technology
                    </div>

                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-8 mb-5 mt-5 px-4">
                    <Icon icon="heroicons:stethoscope" className="w-12 h-12 lg:w-16 lg:h-16 text-blood-primary shrink-0 opacity-75 hidden md:block" />
                    <div className="text-3xl md:text-4xl font-bold max-w-110 text-center leading-tight">
                        Locate Compatible Blood Donors in <span className="text-blood-primary">Seconds</span>
                    </div>
                    <Icon icon="mdi:blood-bag" className="w-12 h-12 lg:w-16 lg:h-16 text-blood-primary shrink-0 hidden md:block" />
                </div>
                {/* text-gray-700 leading-relaxed mb-4 */}
                <div className="text-gray-700 font-medium leading-relaxed mb-7 w-full max-w-3xl lg:w-3xl text-center text-sm md:text-base lg:text-lg px-6">
                    Blood-Trace is a cutting-edge emergency response platform designed for high-stress medical environments. Find, contact, and coordinate with compatible blood donors in your area with unprecedented speed and accuracy.
                </div>

                <Link to={isAuthenticated ? "/dashboard" : '/login'} className="bg-blood-primary hover:bg-red-700 transition cursor-pointer text-white text-[1rem] flex flex-row gap-1.5 p-2 rounded-2xl justify-center items-center w-60 h-12">
                    <div>
                        <Icon icon="mingcute:heartbeat-line" className="h-5.5 w-5.5" />
                    </div>
                    <div>{isAuthenticated ? "Launch Dashboard" : 'Sign Up/Login now'}</div>
                    <div>
                        <Icon
                            icon="lucide:arrow-right"
                            className="w-5.5 h-5.5"
                        />
                    </div>
                </Link>

                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-30 mb-6 my-3 mt-6 text-gray-700 w-full px-4">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-3xl md:text-4xl font-semibold text-blood-primary ">
                            2.5s
                        </div>
                        <div className="text-[0.87rem] md:text-base -m-1">
                            Average Search Time
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center ">
                        <div className="text-3xl md:text-4xl font-semibold text-blood-primary ">
                            50km
                        </div>
                        <div className="text-[0.87rem] md:text-base -m-1">
                            Maximum Search Radius
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="text-3xl md:text-4xl font-semibold text-blood-primary ">
                            24/7
                        </div>
                        <div className="text-[0.87rem] md:text-base -m-1">
                            Real-Time Availability
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2.5 mt-2 mb-6 border border-[#facbcb] rounded-3xl p-6 lg:p-6 w-[90%] md:max-w-2xl lg:max-w-3xl mx-auto shadow-sm">
                    <div className="text-xl md:text-2xl font-medium text-center">
                        Built for Emergency Medical Environments
                    </div>

                    <div className="text-gray-800 w-full text-sm md:text-base text-center px-2 md:px-4">
                        Every feature is designed with HCI principles to reduce cognitive load
                        and enable rapid decision-making during critical moments.
                    </div>
                </div>

                <div className="w-full max-w-7xl px-6 md:px-8 lg:px-23 mx-auto">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="bg-[#ebfef0] border border-[#E0FFE8] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">Medical-Minimalist UI</h4>
                                <Icon icon="mdi:pulse" className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Clean, distraction-free interface using Inter typeface. Maximum readability with reduced cognitive load during crisis situations.
                            </p>
                        </div>

                        <div className="bg-[#e9f3ff] border border-[#E0EFFF] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">Interactive Geolocation</h4>
                                <Icon icon="mdi:map-marker-outline" className="w-6 h-6 text-blue-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                High-contrast, color-coded donor pins on a dark map base. Green for exact matches, blue for universal donors, with instant distance calculations.
                            </p>
                        </div>

                        <div className="bg-[#ffebeb] border border-[#FFE0E0] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold text-lg leading-tight w-2/3">One-Click Emergency Alert</h4>
                                <Icon icon="mdi:clock-outline" className="w-6 h-6 text-red-400" />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Pulse-animated emergency button with maximum affordance. Send instant alerts to all compatible donors within your search radius.
                            </p>
                        </div>

                    </div>

                </div>


                <div className="flex flex-col mt-10 items-center gap-2.5 px-4">
                    <div className="text-xl md:text-2xl font-medium text-center">
                        How Blood-Trace Works
                    </div>

                    <div className="text-gray-800 w-full lg:max-w-3xl text-sm md:text-base lg:text-lg text-center">
                        Three simple steps from emergency to donor coordination
                    </div>
                </div>


                <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-6 lg:gap-10 mt-8 mb-8 px-6 w-full max-w-5xl mx-auto">

                    <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
                        <div>
                            <Icon icon="fluent:number-circle-1-28-regular" className="h-10 w-10 text-blood-primary" />
                        </div>
                        <div className="text-base md:text-[0.9rem] font-semibold text-center">Select Blood Type</div>
                        <div className="text-sm md:text-[0.8rem] text-center text-gray-700">Choose the required blood type. Incompatible options are automatically disabled for error prevention.</div>
                    </div>

                    <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
                        <div>
                            <Icon icon="fluent:number-circle-2-28-regular" className="h-10 w-10 text-blood-primary" />
                        </div>
                        <div className="text-base md:text-[0.9rem] font-semibold text-center">View Donor Map</div>
                        <div className="text-sm md:text-[0.8rem] text-center text-gray-700">See all compatible donors on an interactive map, color-coded by compatibility and sorted by distance.</div>
                    </div>


                    <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
                        <div>
                            <Icon icon="fluent:number-circle-3-28-regular" className="h-10 w-10 text-blood-primary" />
                        </div>
                        <div className="text-base md:text-[0.9rem] font-semibold text-center">Send Emergency Alert</div>
                        <div className="text-sm md:text-[0.8rem] text-center text-gray-700">One click sends alerts to all available donors. Track responses and coordinate pickup in real-time.</div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col gap-5 py-10 px-4 items-center bg-blood-primary text-white text-center">

                <div className="text-2xl md:text-3xl font-semibold">
                    Ready to Save Lives?
                </div>

                <div className="text-sm md:text-base lg:text-lg max-w-2xl">
                    Access the Blood-Trace dashboard and start locating compatible donors in your area.
                </div>

                <Link to={isAuthenticated ? "/dashboard" : '/login'} className="bg-white text-blood-primary cursor-pointer text-sm md:text-[1rem] flex flex-row gap-1.5 px-6 py-3 mt-2 rounded-2xl justify-center items-center shadow-md hover:bg-gray-100 transition-colors">
                    <div>
                        <Icon icon="mingcute:heartbeat-line" className="h-5 w-5 md:h-5.5 md:w-5.5" />
                    </div>
                    <div className="font-medium">{isAuthenticated ? "Launch Dashboard" : 'Sign Up/Login now'}</div>
                    <div>
                        <Icon
                            icon="lucide:arrow-right"
                            className="w-5 h-5 md:w-5.5 md:h-5.5"
                        />
                    </div>
                </Link>

            </div>

        </div>

    )
}

export default Landing;