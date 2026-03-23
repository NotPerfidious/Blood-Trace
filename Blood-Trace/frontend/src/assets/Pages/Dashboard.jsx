import { Icon } from "@iconify/react";
import Slider from "../Components/Slider";

function Dashboard() {

    return (
        <main className="bg-dashboard-main p-4 pb-8 flex flex-row gap-3.5">

            <div className="fixed top-17 right-4 bg-white p-3 rounded-2xl">

                <div className="text-blood-primary font-semibold  text-xl">
                    15
                </div>

                <div className="text-gray-700 text-[0.8rem] font-semibold">Donors found</div>

            </div>

            <div>
                <div className="bg-white relative p-3 pb-30 rounded-lg">

                    <div className='flex flex-row gap-6 items-center'>
                        <div>
                            <Icon icon="line-md:filter" className="h-5 w-5 text-blood-primary" />
                        </div>

                        <div className='font-bold text-[0.9rem]'>Smart filter</div>


                    </div>

                    <div className="text-gray-700 mt-2.5 text-xs font-medium">Required blood type</div>

                    <div className="grid mt-5 grid-cols-4 gap-1">

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">O-</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">O+</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">A-</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">A+</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">B-</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">B+</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">AB-</div>

                        <div className="bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">AB+</div>

                    </div>

                    <div className="text-gray-700 mt-3.5 text-[0.8rem] font-medium">Search Radius: <span className="text-blood-primary">10km</span></div>

                    <div className="mt-3">
                        <Slider />
                    </div>

                    <div className="text-gray-700 mt-2.5 text-xs font-medium">Quick Select</div>

                    <div className="grid grid-cols-3 mt-1.5 gap-2">

                        <div className="text-center font-medium px-0.5 py-1.5 rounded-lg bg-gray-200 text-[0.7rem]">
                            5km
                        </div>

                        <div className="text-center font-medium px-0.5 py-1.5 rounded-lg bg-gray-200 text-[0.7rem]">
                            10km
                        </div>

                        <div className="text-center font-medium px-0.5 py-1.5 rounded-lg bg-gray-200 text-[0.7rem]">
                            50km
                        </div>
                    </div>

                    <div className="absolute bg-gray-100 -bottom-5 left-8 rounded-xl p-4">

                        <div className="text-gray-700 text-[0.8rem] font-semibold">How it works</div>

                        <div className="text-gray-700 mt-1 text-[0.7rem] font-medium">Select required blood type</div>
                    </div>


                    <div className="absolute bg-white -right-42 bottom-0 flex flex-col gap-2 rounded-xl p-4">

                        <div className="text-gray-700 text-[0.8rem] font-semibold">Donor status</div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="text-[0.6rem] text-gray-600">
                                Exact Match & Available
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-3 w-3 text-blue-600" />
                            </div>
                            <div className="text-[0.6rem] text-gray-600">
                                Compatible & Available
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-3 w-3 text-yellow-600" />
                            </div>
                            <div className="text-[0.6rem] text-gray-600">
                                Lower Compatibility
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-3 w-3 text-blood-primary" />
                            </div>
                            <div className="text-[0.6rem] text-gray-600">
                                Unavailable
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </main>
    )

}

export default Dashboard;