import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Landing() {
    return (

        <div className="">

            <div className="flex flex-col gap-5 pb-5 items-center">



                <div className="flex flex-row justify-center items-center gap-3 mt-5 text-xs bg-red-300 text-blood-primary p-1 rounded-3xl pr-2">

                    <Icon
                        icon="material-symbols-light:bolt-outline-rounded"
                        className="w-6 h-6"
                    >

                    </Icon>
                    <div className="text-sm">
                        Emergency Response Technology
                    </div>

                </div>

                <div className="text-3xl font-bold">
                    Locate Compatible Blood Donors in <span className="text-blood-primary">Seconds</span>
                </div>

                <div className="text-gray-700 font-medium w-3xl text-center">
                    Blood-Trace is a cutting-edge emergency response platform designed for high-stress medical environments. Find, contact, and coordinate with compatible blood donors in your area with unprecedented speed and accuracy.
                </div>

                <Link to="/dashboard" className="bg-blood-primary cursor-pointer text-white text-[1rem] flex flex-row gap-1.5 p-2 rounded-2xl justify-center items-center">
                    <div>
                        <Icon icon="mingcute:heartbeat-line" className="h-5.5 w-5.5" />
                    </div>
                    <div>Launch Dashboard</div>
                    <div>
                        <Icon
                            icon="lucide:arrow-right"
                            className="w-5.5 h-5.5"
                        />
                    </div>
                </Link>

                <div className="flex flex-row justify-center items-center gap-20 my-3 text-gray-700">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-2xl font-semibold text-blood-primary ">
                            2.5s
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Average Search Time
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center ">
                        <div className="text-2xl font-semibold text-blood-primary ">
                            50km
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Maximum Search Radius
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="text-2xl font-semibold text-blood-primary ">
                            24/7
                        </div>
                        <div className="text-[0.87rem] -m-1">
                            Real-Time Availability
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2.5">
                    <div className="text-2xl font-medium">
                        Built for Emergency Medical Environments
                    </div>

                    <div className="text-gray-800 w-3xl text-lg text-center">
                        Every feature is designed with HCI principles to reduce cognitive load
                        and enable rapid decision-making during critical moments.
                    </div>
                </div>

                <div className="flex flex-row gap-20 justify-between">

                    <div className="flex flex-col gap-2 p-2.5 items-center bg-green-200 rounded-xl w-60">
                        <div className="flex flex-row gap-12 justify-end items-center">

                            <div className="font-semibold text-[0.9rem]">
                                Medical-Minimalist UI
                            </div>
                            <div>
                                <Icon icon="mingcute:heartbeat-line" className="text-green-500 h-5.5 w-5.5" />
                            </div>

                        </div>

                        <div className="text-xs">
                            Clean, distraction-free interface using Inter typeface. Maximum readability with reduced cognitive load during crisis situations.
                        </div>
                    </div>


                    <div className="flex flex-col gap-2 p-2.5 items-center bg-blue-200 rounded-xl w-60">
                        <div className="flex flex-row gap-12 justify-end items-center">

                            <div className="font-semibold text-[0.9rem]">
                                Interactive Geolocation
                            </div>
                            <div>
                                <Icon icon="boxicons:location" className="text-blue-500 h-5.5 w-5.5" />
                            </div>

                        </div>

                        <div className="text-xs">
                            High-contrast, color-coded donor pins on a dark map base. Green for exact matches, blue for universal donors, with instant distance calculations.
                        </div>
                    </div>


                    <div className="flex flex-col gap-2 p-2.5 items-center bg-red-200 rounded-xl w-60">
                        <div className="flex flex-row gap-12 justify-end items-center">

                            <div className="font-semibold text-[0.9rem]">
                                One-Click Emergency Alert
                            </div>
                            <div>
                                <Icon icon="tabler:clock" className="text-red-500 h-5.5 w-5.5" />
                            </div>

                        </div>

                        <div className="text-xs">
                            Pulse-animated emergency button with maximum affordance. Send instant alerts to all compatible donors within your search radius.
                        </div>
                    </div>

                </div>


                <div className="flex flex-col mt-4 items-center gap-2.5">
                    <div className="text-2xl font-medium">
                        How Blood-Trace Works
                    </div>

                    <div className="text-gray-800 w-3xl text-lg text-center">
                        Three simple steps from emergency to donor coordination
                    </div>
                </div>


                <div className="flex flex-row justify-between gap-10">

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

                <Link to="/dashboard" className="bg-white text-blood-primary cursor-pointer text-[1rem] flex flex-row gap-1.5 p-2 rounded-2xl justify-center items-center">
                    <div>
                        <Icon icon="mingcute:heartbeat-line" className="h-5.5 w-5.5" />
                    </div>
                    <div>Launch Dashboard</div>
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