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

                <div className="text-4xl font-bold mb-5 mt-5 max-w-120 text-center">
                    Locate Compatible Blood Donors in <span className="text-blood-primary">Seconds</span>
                </div>
                {/* text-gray-700 leading-relaxed mb-4 */}
                <div className="text-gray-700 font-medium leading-relaxed mb-7 w-3xl text-center text-lg">
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

                <div className="flex flex-row justify-center items-center gap-30 mb-6 my-3 mt-6 text-gray-700">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-3xl font-semibold text-blood-primary ">
                            2.5s
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Average Search Time
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center ">
                        <div className="text-3xl font-semibold text-blood-primary ">
                            50km
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Maximum Search Radius
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="text-3xl font-semibold text-blood-primary ">
                            24/7
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Real-Time Availability
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2.5 mt-2 mb-6 border border-[#facbcb] rounded-3xl p-4">
                    <div className="text-2xl font-medium ">
                        Built for Emergency Medical Environments
                    </div>

                    <div className="text-gray-800 w-3xl text-1 text-center">
                        Every feature is designed with HCI principles to reduce cognitive load
                        and enable rapid decision-making during critical moments.
                    </div>
                </div>

                <div className=" mr-23 ml-23">
                    <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

                </div>


                <div className="flex flex-col mt-5 items-center gap-2.5">
                    <div className="text-2xl font-medium">
                        How Blood-Trace Works
                    </div>

                    <div className="text-gray-800 w-3xl text-lg text-center">
                        Three simple steps from emergency to donor coordination
                    </div>
                </div>


                <div className="flex flex-row justify-between gap-10 mb-5">

                    <div className="flex flex-col items-center gap-3 w-60">
                        <div>
                            <Icon icon="fluent:number-circle-1-28-regular" className="h-10 w-10" />
                        </div>
                        <div className="text-[0.9rem] font-semibold">Select Blood Type</div>
                        <div className="text-[0.8rem] text-center">Choose the required blood type. Incompatible options are automatically disabled for error prevention.</div>
                    </div>

                    <div className="flex flex-col items-center gap-3 w-60">
                        <div>
                            <Icon icon="fluent:number-circle-2-28-regular" className="h-10 w-10" />
                        </div>
                        <div className="text-[0.9rem] font-semibold">View Donor Map</div>
                        <div className="text-[0.8rem] text-center">See all compatible donors on an interactive map, color-coded by compatibility and sorted by distance.</div>
                    </div>


                    <div className="flex flex-col items-center gap-3 w-60">
                        <div>
                            <Icon icon="fluent:number-circle-3-28-regular" className="h-10 w-10" />
                        </div>
                        <div className="text-[0.9rem] font-semibold">Send Emergency Alert</div>
                        <div className="text-[0.8rem] text-center">One click sends alerts to all available donors. Track responses and coordinate pickup in real-time.</div>
                    </div>

                </div>

            </div>

            <div className=" flex flex-col gap-5 pt-5 pb-5 items-center bg-blood-primary text-white">

                <div className="text-3xl font-semibold">
                    Ready to Save Lives?
                </div>

                <div className="text-lg">
                    Access the Blood-Trace dashboard and start locating compatible donors in your area.
                </div>

                <Link to={isAuthenticated ? "/dashboard" : '/login'} className="bg-white text-blood-primary cursor-pointer text-[1rem] flex flex-row gap-1.5 p-2 rounded-2xl justify-center items-center">
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

            </div>

        </div>

    )
}

export default Landing;