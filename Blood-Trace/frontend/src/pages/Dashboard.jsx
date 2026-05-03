/**
 * Dashboard Page
 * Provides the main interface for finding blood donors. Includes a map view,
 * blood type filtering, search radius adjustment, and emergency alert broadcasting.
 */
import { Icon } from "@iconify/react";
import Slider from "../components/Slider";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import createDonorMarker from "../utils/createDonorMarker";
import { bloodCompatibility } from "../utils/data";
import { bloodTypes } from "../utils/data";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import API from '../utils/API'

// const receipentBloodType = 'A+';



function Dashboard() {
    const [emergencyAlert, setEmergencyAlert] = useState(false);
    const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
    const [directRequestSent, setDirectRequestSent] = useState(false);
    const [searchRadius, setSearchRadius] = useState(10);
    const [showDonor, setShowDonor] = useState(undefined);
    const [receipentBloodType, setReceipentBloodType] = useState(undefined);
    const [compatibleDonors, setCompatibleDonors] = useState(undefined);
    const [currPosition, setCurrPosition] = useState({ latitude: 31.5204, longitude: 74.3587 });
    const timeoutId = useRef(undefined);


    const getUserCoordinates = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    }



    // receipentBloodType && navigator.geolocation.getCurrentPosition((pos) => {
    //     latitude = pos.coords.latitude
    //     longitude = pos.coords.longitude
    // })

    //console.log('Allah hu Akbar')

    useEffect(() => {
        const obtainingUserCoordinates = async () => {

            const position = await getUserCoordinates();
            const { latitude, longitude } = position.coords;
            setCurrPosition({ latitude, longitude });
        }


        try {
            obtainingUserCoordinates();
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {

        const fetchDonors = async () => {

            if (receipentBloodType) {

                const response = await API.get(`/donor/search?lng=${currPosition.longitude}&lat=${currPosition.latitude}&radius=${searchRadius}`)

                const bloodDonors = response.data.donors;

                setCompatibleDonors(bloodDonors.filter((donor => bloodCompatibility[receipentBloodType].includes(donor.bloodType))));

                //console.log("aaa", bloodDonors);
            }
        }

        try {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                fetchDonors();
            }, 200)

        } catch (error) {
            console.log(error);
        }

        //console.log('Bismillah');



        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }

    }, [receipentBloodType, searchRadius, currPosition])

    //console.log('Why?')

    const yourLocationIcon = () => {

        return L.divIcon({
            className: 'custom-div-icon',
            // The HTML structure: Dot container + Label
            html: `
                <div class="flex flex-col items-center">
                    <!-- The Pulsing Circle -->
                    <div class="relative flex items-center justify-center w-10 h-10">
                        <div class="absolute w-full h-full bg-blue-400 opacity-20 rounded-full"></div>
                        <div class="pulse-dot w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
        
                    <!-- The "Your Location" Tag -->
                    <div class="mt-1 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-lg shadow-md whitespace-nowrap">
                        Your Location
                    </div>
                </div>`,

            iconSize: [100, 60], // Size of the invisible container
            iconAnchor: [50, 30], // Point of the icon which will correspond to marker's location (Center)
        });

    }

    function SearchRadius({ searchRadius }) {

        const zoneOptions = {
            fillColor: '#f87171',
            color: '#dc2626',
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.3,
            dashArray: '5, 10'
        };

        return (
            <Circle
                center={[currPosition.latitude, currPosition.longitude]}
                pathOptions={zoneOptions}
                radius={searchRadius * 1000}
                interactive={false}
            />
        );

    }

    // const compatibleDonors = receipentBloodType && bloodDonors.filter(donor => {
    //     if (bloodCompatibility[receipentBloodType].includes(donor.bloodType)) {

    //         const p1 = L.latLng(donor.geolocation[1], donor.geolocation[0]);
    //         const p2 = L.latLng(latitude, longitude);

    //         const distanceKm = p1.distanceTo(p2) / 1000;

    //         return distanceKm <= searchRadius ? true : false;
    //     }
    //     return false
    // })

    //console.log(searchRadius)

    useEffect(() => {
        if (emergencyAlert || emergencyAlertSent) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'unset'
        }
    }, [emergencyAlert])

    const nameIcon = (name) => {
        let arr = name.split(' ')

        if (arr.length > 1) {
            arr = arr[0][0] + arr[1][0]


            return arr.toUpperCase()
        }
        return arr[0][0].toUpperCase()
    }

    const getDistance = (lat, lng) => {
        const p1 = L.latLng(currPosition.latitude, currPosition.longitude);
        const p2 = L.latLng(lat, lng);

        const distance = p1.distanceTo(p2) / 1000;

        return distance.toFixed(2);
    }

    const formatDate = (dateIso) => {

        const date = new Date(dateIso);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        return date.toLocaleDateString(date, options)
    }

    const handleDirectRequest = async (donor) => {
        try {
            await API.post('/notification/send-request/' + donor._id, {
                location: [currPosition.longitude, currPosition.latitude]
            });
            setDirectRequestSent(true);
            setTimeout(() => setDirectRequestSent(false), 3000);
        } catch (error) {
            console.log('[ERROR] Direct request failed:', error);
        }
    }

    const handleEmergencyAlert = async () => {
        try {
            const donorUserIds = compatibleDonors.map(d => d.user);
            await API.post('/notification/send-emergency', {
                donorUserIds,
                location: [currPosition.longitude, currPosition.latitude]
            });
        } catch (error) {
            console.log('[ERROR] Emergency alert failed:', error);
        } finally {
            setEmergencyAlert(false);
            setEmergencyAlertSent(true);
        }
    }

    return (
        <>
            <div className="bg-dashboard-main p-4 pb-8 pr-35 min-h-full flex flex-row gap-3.5 flex-1">



                {receipentBloodType && (
                    <div className="fixed top-17 right-4 bg-white p-3 z-999 rounded-2xl">

                        <div className="text-blood-primary font-semibold  text-xl">
                            {compatibleDonors && compatibleDonors.length}
                        </div>

                        <div className="text-gray-700 text-[0.8rem] font-semibold">Donors found</div>

                    </div>
                )}



                <div>
                    <div className="bg-white relative p-3 pb-33 rounded-lg">

                        {receipentBloodType && (<button onClick={() => {
                            setReceipentBloodType(undefined);
                            setShowDonor(undefined);
                            setCompatibleDonors(undefined);
                        }}
                            className="cursor-pointer absolute top-3 right-3">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>)}

                        <div className='flex flex-row gap-6 items-center'>
                            <div>
                                <Icon icon="line-md:filter" className="h-5 w-5 text-blood-primary" />
                            </div>

                            <div className='font-bold text-[0.9rem]'>Smart filter</div>


                        </div>

                        <div className="text-gray-700 mt-2.5 text-xs font-medium">Required blood type</div>

                        <div className="grid mt-5 grid-cols-4 gap-1">

                            {bloodTypes.map((b, index) => {
                                return (

                                    <div key={index} onClick={() => { setReceipentBloodType(b) }} className={`cursor-pointer  px-2.5 py-2.5 border-2 text-center rounded-xl font-medium text-[0.9rem]

                                ${receipentBloodType == b ? 'bg-blood-primary text-white border-white' :
                                            ((receipentBloodType && bloodCompatibility[receipentBloodType].includes(b)) ? 'bg-blue-100 border-blue-300 text-blue-400' : 'bg-gray-200  border-gray-300')}
                            `}>{b}
                                    </div>

                                )
                            })}

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

                            <div onClick={() => { setSearchRadius(25) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 25 ? 'bg-blood-primary text-white' : 'bg-gray-200'}`}>
                                25 km
                            </div>
                        </div>

                        <div className="absolute bg-gray-200 -bottom-5 left-8 rounded-xl p-4">

                            <div className="text-gray-700 text-[0.8rem] font-semibold">How it works</div>

                            <div className="text-gray-700 mt-1 text-[0.7rem] font-medium">Select required blood type</div>
                        </div>

                    </div>



                </div>

                <div className="relative flex-1 py-2 ">

                    <MapContainer center={[currPosition.latitude, currPosition.longitude]} zoom={9.7}>

                        <TileLayer
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {compatibleDonors && compatibleDonors.map(((donor) => {
                            return (
                                <Marker key={donor._id} position={[donor.geolocation[1], donor.geolocation[0]]} icon={createDonorMarker(donor, receipentBloodType)}
                                    eventHandlers={{
                                        click: () => { setShowDonor(donor) }
                                    }}
                                />

                            )
                        }))}

                        <Marker key={crypto.randomUUID()}
                            position={[currPosition.latitude, currPosition.longitude]} icon={yourLocationIcon()} />


                        <SearchRadius searchRadius={Number(searchRadius)} />


                    </MapContainer>

                    <div className="absolute border  bg-white z-1001 left-0 bottom-0 flex flex-col gap-2 rounded-xl p-4">

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


                    <div onClick={() => { setEmergencyAlert(true) }} className="absolute -bottom-2 right-[38%] z-1001 px-7 py-3 bg-blood-primary cursor-pointer text-white text-[1rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                        <div>
                            <Icon icon="ix:about" className="h-4.5 w-4.5" />
                        </div>
                        <div>Emergency Alert</div>
                    </div>



                </div>

                <div className=""> {/*Donor info window*/}

                    {showDonor && (
                        <div className="relative bg-white rounded-lg overflow-hidden">

                            <button onClick={() => { setShowDonor(undefined) }} className="cursor-pointer absolute top-3 right-3">
                                <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                            </button>

                            <div className={`${showDonor.isAvailable ?
                                (showDonor.bloodType == receipentBloodType ? 'bg-green-100' : 'bg-blue-100')
                                :
                                'bg-red-100'} 
                                flex flex-col p-3 py-5 gap-3 justify-center `}>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-600' : 'bg-blue-600') : 'bg-blood-primary'} text-white p-3.75 rounded-full font-bold`}>
                                        {nameIcon(showDonor.name)}
                                    </div>
                                    <div className='flex-col justify-center-safe'>
                                        <div className='font-bold'>{showDonor.name}</div>
                                        <div className='text-xs text-gray-600 -mt-1'>Blood Donor Profile</div>
                                    </div>
                                </div>


                                <div className="flex flex-row gap-2 items-center">


                                    <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-200 text-green-800 border-green-400' : 'bg-blue-200 text-blue-800 border-blue-400') : 'bg-red-200 text-red-800 border-red-400'} px-1.5 rounded-lg border inline-flex flex-row items-center`}>
                                        <div className="">
                                            <Icon icon="mingcute:heartbeat-line" className=" h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            {showDonor.isAvailable ? 'Available Now' : 'Not Available'}
                                        </div>
                                    </div>

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
                                        {getDistance(showDonor.geolocation[1], showDonor.geolocation[0])} km away
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
                                            {
                                            formatDate(showDonor.lastDonationDate)}
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

                                <div
                                    onClick={() => handleDirectRequest(showDonor)}
                                    className={`cursor-pointer px-5 text-white text-[1rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center transition-colors ${
                                        directRequestSent ? 'bg-green-600' : 'bg-blood-primary'
                                    }`}>
                                    <div>
                                        <Icon
                                            icon={directRequestSent ? "charm:circle-tick" : "tabler:send"}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                    <div className="font-bold">{directRequestSent ? 'Request Sent!' : 'Send Direct Request'}</div>
                                </div>

                                <div className="text-gray-500 text-[0.6rem] font-medium">
                                    Please be courteous when contacting donors
                                </div>

                            </div>

                        </div>
                    )

                    }
                </div>

            </div>


            {emergencyAlert && (

                <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-slate-900/60 transition-opacity"
                        onClick={() => { setEmergencyAlert(false); setEmergencyAlertSent(true) }}
                    />

                    <div className="relative overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide max-w-lg w-full  rounded-3xl bg-white">

                        <div className="flex gap-2 flex-row  items-center p-6">

                            <div>
                                <Icon icon="emojione-monotone:warning" className="w-9 h-9 text-blood-primary" />
                            </div>

                            <div>
                                <div className="font-bold text-lg">Emergency Broadcast</div>
                                <div className="text-sm text-gray-700">Notify all compatible donors</div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-2 p-3 m-6  mt-8 justify-center border border-red-400 bg-red-200 rounded-xl">

                            <div className="flex justify-between text-[0.9rem] items-center">
                                <div>Required Blood Type</div>

                                <div className="text-blood-primary font-bold text-[1rem]">
                                    {receipentBloodType}
                                </div>
                            </div>

                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="weui:location-outlined" className="w-5 h-5" /></div>
                                    <div>Search Radius</div>
                                </div>


                                <div className="font-bold text-[1rem]">
                                    {searchRadius} km
                                </div>
                            </div>


                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="bi:people" className="w-5 h-5" /></div>
                                    <div>Compatible Donors</div>
                                </div>


                                <div className="font-bold text-[1rem] text-green-600">
                                    {compatibleDonors ? compatibleDonors.length : '0'}
                                </div>
                            </div>

                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="iconamoon:clock-light" className="w-5 h-5" /></div>
                                    <div>Est. Response Time</div>
                                </div>


                                <div className="font-bold text-[1rem]">
                                    1-3 min
                                </div>
                            </div>

                        </div>

                        <div className=" m-6 p-3 text-[0.9rem] mt-8 justify-center border border-yellow-400 bg-yellow-50 rounded-xl">
                            <span className="font-semibold">Important:</span> This will send push notifications, SMS, and in-app alerts to all {compatibleDonors ? compatibleDonors.length : 0} compatible donors in your area. Please use this only for genuine emergencies
                        </div>


                        <div className="text-gray-700 font-bold m-6 mt-5">Message to be sent:</div>

                        <div className="flex flex-col gap-2 p-3 m-6 text-[0.9rem] mt-2 justify-center border border-gray-400 bg-gray-50 rounded-xl">
                            <div className="flex gap-2">
                                <div>
                                    <Icon icon="fluent:alert-on-24-regular" className="w-5 h-5 text-blood-primary" />
                                </div>
                                <div className="text-blood-primary text-[0.9rem]">URGENT BLOOD REQUEST</div>
                            </div>

                            <div className="flex flex-col -space-y-1 text-[0.8rem]">
                                <div>Blood Type Needed: {receipentBloodType}</div>
                                <div>Location: Within {searchRadius} km from your area</div>
                            </div>

                            <div className="text-[0.7rem]">Please respond if you are available to donate.</div>
                        </div>

                        <div className="sticky bottom-0 p-3 border-t border-gray-400 bg-white  grid grid-cols-2 gap-3 mt-5">

                            <div onClick={() => { setEmergencyAlert(false) }} className="px-3 py-2 border border-gray-400 text-gray-700 cursor-pointer font-semibold 
                         text-[0.9rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                                <div>Cancel</div>
                            </div>

                            <div onClick={handleEmergencyAlert} className="px-3 py-2 bg-blood-primary cursor-pointer font-semibold text-white text-[0.9rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                                <div>Send Emergency Alert</div>
                            </div>

                        </div>

                        <button onClick={() => { setEmergencyAlert(false) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>

                    </div>
                </div>
            )}


            {emergencyAlertSent && (
                <div className="fixed inset-0 z-10000 flex justify-center items-center">

                    <div className="absolute inset-0 bg-slate-900/50 transition-opacity" />

                    <div className="relative w-full max-h-[90vh] max-w-lg bg-white p-6 rounded-3xl">

                        <div className="flex flex-col gap-2 justify-center items-center">
                            <Icon icon="charm:circle-tick" className="text-green-600 h-12 w-12" />
                            <div className="font-bold text-2xl">Alert Sent Successfully!</div>

                            <div className="text-gray-700 text-[0.9rem]">
                                {compatibleDonors ? compatibleDonors.length : '0'} donors have been notified. You should receive responses
                                shortly
                            </div>
                        </div>

                        <div className="bg-green-100 mt-5 text-green-600 p-4 text-[0.9rem] rounded-xl text-center">
                            We'll notify you when donor respond to your request.
                        </div>

                        <button onClick={() => { setEmergencyAlertSent(false) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}





        </>
    )

}

export default Dashboard;