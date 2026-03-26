import { Icon } from "@iconify/react";
import Slider from "../Components/Slider";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import createDonorMarker from "../Utils/createDonorMarker";
import { bloodCompatibility } from "../Utils/data";
import { bloodDonors } from "../Utils/data";
import { useState } from "react";

// const receipentBloodType = 'A+';






function Dashboard() {


    const [searchRadius, setSearchRadius] = useState(10);
    const [showDonor, setShowDonor] = useState(undefined);
    const [receipentBloodType, setReceipentBloodType] = useState(undefined)


    const compatibleDonors = receipentBloodType && bloodDonors.filter(donor => bloodCompatibility[receipentBloodType].includes(donor.bloodType))

    console.log(searchRadius)

    const nameIcon = (name) => {


        let arr = name.split(' ')

        if (arr.length > 1) {
            arr = arr[0][0] + arr[1][0]


            return arr.toUpperCase()
        }
        return arr[0][0].toUpperCase()
    }


    return (
        <main className="bg-dashboard-main p-4 pb-8 pr-35 flex flex-row gap-3.5">

            {receipentBloodType && (
                <div className="fixed top-17 right-4 bg-white p-3 z-999 rounded-2xl">

                    <div className="text-blood-primary font-semibold  text-xl">
                        {compatibleDonors.length}
                    </div>

                    <div className="text-gray-700 text-[0.8rem] font-semibold">Donors found</div>

                </div>
            )}



            <div>
                <div className="bg-white relative p-3 pb-33 rounded-lg">

                    <div className='flex flex-row gap-6 items-center'>
                        <div>
                            <Icon icon="line-md:filter" className="h-5 w-5 text-blood-primary" />
                        </div>

                        <div className='font-bold text-[0.9rem]'>Smart filter</div>


                    </div>

                    <div className="text-gray-700 mt-2.5 text-xs font-medium">Required blood type</div>

                    <div className="grid mt-5 grid-cols-4 gap-1">

                        <div onClick={() => { setReceipentBloodType('O-') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">O-</div>

                        <div onClick={() => { setReceipentBloodType('O+') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">O+</div>

                        <div onClick={() => { setReceipentBloodType('A-') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">A-</div>

                        <div onClick={() => { setReceipentBloodType('A+') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">A+</div>

                        <div onClick={() => { setReceipentBloodType('B-') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">B-</div>

                        <div onClick={() => { setReceipentBloodType('B+') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">B+</div>

                        <div onClick={() => { setReceipentBloodType('AB-') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">AB-</div>

                        <div onClick={() => { setReceipentBloodType('AB+') }} className="cursor-pointer bg-gray-200 px-2.5 py-2.5 border-2 text-center border-gray-300 rounded-xl font-medium text-[0.9rem]">AB+</div>

                    </div>

                    <div className="text-gray-700 mt-3.5 text-[0.8rem] font-medium">Search Radius: <span className="text-blood-primary">{searchRadius} km</span></div>

                    <div className="mt-3">
                        <Slider value={searchRadius} setValue={setSearchRadius} />
                    </div>

                    <div className="text-gray-700 mt-2.5 text-xs font-medium">Quick Select</div>

                    <div className="grid grid-cols-3 mt-1.5 gap-2">

                        <div onClick={() => { setSearchRadius(5) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 5 ? ' text-white bg-blood-primary' : 'bg-gray-200'}`}>
                            5 km
                        </div>

                        <div onClick={() => { setSearchRadius(10) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 10 ? 'bg-blood-primary text-white' : 'bg-gray-200'}`}>
                            10 km
                        </div>

                        <div onClick={() => { setSearchRadius(50) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 50 ? 'bg-blood-primary text-white' : 'bg-gray-200'}`}>
                            50 km
                        </div>
                    </div>

                    <div className="absolute bg-gray-200 -bottom-5 left-8 rounded-xl p-4">

                        <div className="text-gray-700 text-[0.8rem] font-semibold">How it works</div>

                        <div className="text-gray-700 mt-1 text-[0.7rem] font-medium">Select required blood type</div>
                    </div>


                    <div className="absolute border  bg-white z-999 -right-52 bottom-0 flex flex-col gap-2 rounded-xl p-4">

                        <div className="text-gray-700 text-[0.8rem] font-semibold">Donor status</div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="text-[0.8rem] text-gray-600">
                                Exact Match & Available
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="text-[0.8rem] text-gray-600">
                                Compatible & Available
                            </div>
                        </div>

                        {/* <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-3 w-3 text-yellow-600" />
                            </div>
                            <div className="text-[0.6rem] text-gray-600">
                                Lower Compatibility
                            </div>
                        </div> */}

                        <div className="flex flex-row items-center gap-3">
                            <div>
                                <Icon icon="ri:circle-fill" className="h-4 w-4 text-blood-primary" />
                            </div>
                            <div className="text-[0.8rem] text-gray-600">
                                Unavailable
                            </div>
                        </div>

                    </div>
                </div>



            </div>

            <div className=" flex-1 py-2  saturate-50 -[.2]">

                <MapContainer center={[31.5204, 74.3587]} zoom={10}>

                    <TileLayer
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {receipentBloodType && compatibleDonors.map(((donor) => {
                        return (
                            <Marker key={donor.id} position={donor.geolocation} icon={createDonorMarker(donor, receipentBloodType)}
                                eventHandlers={{
                                    click: () => { setShowDonor(donor) }
                                }}
                            >

                                {/* <Popup>{donor.bloodType}</Popup> */}

                            </Marker>
                        )
                    }))}

                </MapContainer>

            </div>

            <div className="">

                {showDonor && (
                    <div className="relative bg-white rounded-lg overflow-hidden">

                        <button onClick={() => { setShowDonor(undefined) }} className="cursor-pointer absolute top-3 right-3">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>

                        <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-100' : 'bg-blue-100') : 'bg-red-100'} flex flex-col p-3 py-5 gap-3 justify-center `}>
                            <div className="flex flex-row gap-2 items-center">
                                <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-600' : 'bg-blue-600') : 'bg-blood-primary'} text-white p-3 px-3.5 rounded-full font-bold`}>
                                    {nameIcon(showDonor.name)}
                                </div>
                                <div className='flex-col justify-center-safe'>
                                    <div className='font-bold'>{showDonor.name}</div>
                                    <div className='text-xs text-gray-600 -mt-1'>Blood Donor Profile</div>
                                </div>
                            </div>


                            <div className="flex flex-row gap-2 items-center">

                                {showDonor.isAvailable && (
                                    <div className={`${(showDonor.bloodType == receipentBloodType ? 'bg-green-200 text-green-800 border-green-400' : 'bg-blue-200 text-blue-800 border-blue-400')} px-1.5 rounded-lg border inline-flex flex-row items-center`}>
                                        <div className="">
                                            <Icon icon="mingcute:heartbeat-line" className=" h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            Available Now
                                        </div>
                                    </div>)}

                                {(showDonor.bloodType == receipentBloodType) && (
                                    <div className="bg-green-200 text-green-800 px-1.5 rounded-lg border border-green-400">
                                        <div className="text-sm">
                                            Exact match
                                        </div>
                                    </div>
                                )}




                            </div>
                        </div>

                        <div className="p-3 flex flex-col gap-3 items-center">
                            <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                <div className="flex flex-row gap-3 items-center">

                                    <div>
                                        <Icon icon="akar-icons:location" className="text-blood-primary h-5.5 w-5.5" />
                                    </div>
                                    <div className="font-semibold text-gray-700 text-[0.8rem]">
                                        Distance
                                    </div>


                                </div>

                                <div className=" ml-8.5 font-semibold">
                                    0.73 km away
                                </div>
                            </div>

                            {showDonor.lastDonationDate && (
                                <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                    <div className="flex flex-row gap-3 items-center">

                                        <div>
                                            <Icon icon="uil:calendar" className="text-blood-primary h-5.5 w-5.5" />
                                        </div>
                                        <div className="font-semibold text-gray-700 text-[0.8rem]">
                                            Last Donation
                                        </div>


                                    </div>

                                    <div className=" ml-8.5 font-semibold">
                                        {showDonor.lastDonationDate}
                                    </div>
                                </div>
                            )}


                            <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                <div className="flex flex-row gap-3 items-center">

                                    <div>
                                        <Icon icon="lucide:phone" className="text-blood-primary h-5.5 w-5.5" />
                                    </div>
                                    <div className="font-semibold text-gray-700 text-[0.8rem]">
                                        Contact Number
                                    </div>


                                </div>

                                <div className=" ml-8.5 font-semibold">
                                    {showDonor.contactNumber}
                                </div>
                            </div>

                            <div className="bg-blood-primary cursor-pointer px-5 text-white text-[1rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                                <div>
                                    <Icon
                                        icon="tabler:send"
                                        className="w-5 h-5"
                                    />
                                </div>
                                <div className="font-bold">Send Direct Request</div>
                            </div>

                            <div className="text-gray-700 text-[0.6rem]">
                                Please be courteous when contacting donors
                            </div>

                        </div>

                    </div>
                )

                }

            </div>
        </main>
    )

}

export default Dashboard;