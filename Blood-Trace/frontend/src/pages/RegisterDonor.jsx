import { Icon } from "@iconify/react";
import { bloodTypes } from "../utils/data";
import { useEffect, useRef, useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import axios from 'axios';
import API from "../utils/API";
import { useDispatch } from "react-redux";
import { setIsDonor } from "../features/auth/authSlice";


function RegisterDonor() {

    const dispatch = useDispatch();



    const [name, setName] = useState(undefined);
    const [contactNumber, setContactNumber] = useState(undefined);
    const [bloodType, setBloodType] = useState(undefined);
    const [lastDonationDate, setLastDonationDate] = useState(undefined);
    const dateInputRef = useRef(undefined);
    const [city, setCity] = useState(undefined);
    const [area, setArea] = useState(undefined);
    const [isAvailable, setIsAvailable] = useState(true);

    const [inCompleteSubmission, setInCompleteSubmission] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {

        const isDonorRegistered = async () => {

            const response = await API.get('/donor/check');

            // setTimeout(() => {
            //     console.log('isDonorRegistered ', response);
            // }, 4000);


            if (response.status === 200 && response.data.message === 'User is a registered donor') {
                setRegistrationSuccess(true);
                return;
            }

            setRegistrationSuccess(false);
        }

        try {

            isDonorRegistered();

        } catch (error) {

        }
    }, [])

    // console.log(name);
    // console.log(contactNumber);
    // console.log(bloodType);
    // console.log(lastDonationDate);
    // console.log(city);
    // console.log(area);
    // console.log(isAvailable);

    useEffect(() => {
        if (inCompleteSubmission) {
            document.body.style.overflow = 'hidden'
        }
        else
            document.body.style.overflow = 'unset'
    }, [inCompleteSubmission])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !contactNumber || !bloodType || !city || !area) {
            setInCompleteSubmission(true);
            return;
        }

        try {
            const apiResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${area + ', ' + city}&format=json&addressdetails=1&limit=1`)

            console.log(apiResponse.status);
            console.log(apiResponse);

            const apiData = apiResponse.data[0];

            if (apiResponse.status != 200 || !apiData) {
                setErrorMessage('Location could not be found. Try another nearby location')
                return;
            }

            const geolocation = [parseFloat(apiData.lon), parseFloat(apiData.lat)];



            const response = await API.post('/donor/register', {
                name,
                bloodType,
                geolocation,
                contactNumber,
                city,
                area,
                isAvailable,
                ...(lastDonationDate && { lastDonationDate })
            })

            if (response.status === 201 && response.data.message === 'Donor registration successfull') {
                setRegistrationSuccess(true);
                dispatch(setIsDonor(true));
            }
            else {
                setErrorMessage(response.data.message);
            }



        } catch (error) {

            if (error.response) {
                // The server responded with a status code outside of 2xx
                console.log("Status:", error.response.status);
                console.log("Message:", error.response.data?.message || error.response.data?.error);

                const msg = error.response.data?.message || error.response.data?.error || 'Something went wrong. Please try again.';
                setErrorMessage(msg);

                if (error.response.status === 403) {
                    console.error("Blocked: Check your User-Agent or IP limits.");
                }
            } else {
                console.log(`[ERROR]: ${error}`);
                setErrorMessage('Something went wrong. Please try again.');
            }

        }

        // console.log(name);
        // console.log(contactNumber);
        // console.log(bloodType);
        // console.log(lastDonationDate);
        // console.log(city);
        // console.log(area);
        // console.log(isAvailable);
    }

    const handleDateInputClick = () => {
        if (dateInputRef.current.showPicker) {
            dateInputRef.current.showPicker()
        }
    }

    return (


        <main className="flex-1 flex flex-col gap-5 justify-center items-center p-4 bg-[#fdf0f0]">


            {!registrationSuccess && (
                <>
                    <div className="bg-blood-primary p-4 rounded-full">
                        <Icon icon="solar:user-plus-rounded-linear" className="text-white w-13 h-13" />
                    </div>

                    <div className="flex-col gap-2 justify-center items-center">
                        <div className="font-bold text-2xl text-center">Register as Blood Donor</div>
                        <div className="text-lg font-semibold text-gray-600">Join our community of life-savers and help people in need</div>
                    </div>

                    <form onSubmit={handleSubmit} action="" className="p-4 w-full max-w-2xl bg-white border border-gray-400 rounded-xl">

                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-xl">Personal Information</div>
                            <hr className="text-gray-700" />
                        </div>


                        <div className="mt-5 flex flex-col">
                            <label htmlFor="user-name" className="text-lg">Full Name</label>
                            <input onChange={(e) => { setName(e.target.value) }} placeholder="Enter your full name" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-name" type="text" />
                        </div>

                        <div className="mt-5 flex flex-col">
                            <label htmlFor="user-phone-number" className="text-lg">Phone Number</label>
                            <input onChange={(e) => setContactNumber(e.target.value)} placeholder="0300-1234567" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-phone-number" type="text" />
                        </div>


                        <div className="mt-7 flex flex-col gap-2">
                            <div className="font-bold text-xl">Blood Information</div>
                            <hr className="text-gray-700" />
                        </div>

                        <div htmlFor="user-name" className="mt-3 text-lg">Blood Type</div>

                        <div>

                        </div>

                        <div className="flex justify-center">
                            <div className="grid mt-5 grid-cols-4 gap-y-10 gap-x-20">

                                {bloodTypes.map((b, index) => {
                                    return (

                                        <div key={index} onClick={() => { setBloodType(b) }} className={`flex justify-center items-center cursor-pointer w-18 h-18  px-3.5 py-2.5 border-2 text-center rounded-xl font-medium text-lg

                            ${bloodType == b ? 'bg-blood-primary text-white border-white' : 'bg-gray-200  border-gray-300'}
                            `}>{b}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>


                        <div className="mt-7 flex flex-col">
                            <label htmlFor="user-name" className="text-lg">Last Donation Date (Optional)</label>
                            <input ref={dateInputRef} onClick={handleDateInputClick} onChange={(e) => setLastDonationDate(e.target.value)} placeholder="mm/dd/yyyy" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-name" type="date" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">Last Donation Date (Optional)</div>

                        <div className="mt-7 flex flex-col gap-2">
                            <div className="flex items-center gap-2">

                                <div>
                                    <Icon icon="akar-icons:location" className="w-5 h-5" />
                                </div>

                                <div className="font-bold text-xl">Location Information</div>
                            </div>
                            <hr className="text-gray-700" />
                        </div>


                        <div className="mt-5 flex justify-between items-center px-10">

                            <div className="flex flex-col">
                                <label htmlFor="user-name" className="">City</label>
                                <input onChange={(e) => setCity(e.target.value)} placeholder="e.g Lahore" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-name" type="text" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="user-name" className="">Area/Locality</label>
                                <input onChange={(e) => setArea(e.target.value)} placeholder="e.g. Gulberg" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-name" type="text" />
                            </div>

                        </div>

                        <div className="mt-7 flex flex-col gap-2">
                            <div className="font-bold text-xl">Availability</div>
                            <hr className="text-gray-700" />
                        </div>

                        <div className="mt-5 bg-gray-300 p-3 rounded-xl flex justify-between items-center">
                            <div>
                                <div className="text-sm font-bold">Currently Available for Donation</div>
                                <div className="text-sm -mt-0.5 text-gray-600">You can update this anytime from your profile</div>
                            </div>

                            <div>
                                <ToggleSwitch isOn={isAvailable} setIsOn={setIsAvailable} />
                            </div>
                        </div>


                        <div className="p-3 mt-5 rounded-xl bg-blue-200">

                            <div className="text-sm font-bold">Important Information</div>

                            <ul className="text-sm mt-3 list-disc list-outside ml-5">
                                <li>You must be 18-65 years old to donate blood</li>
                                <li>Minimum weight requirement is 50 kg</li>
                                <li>Wait at least 56 days between donations</li>
                                <li>Your contact information will only be shared with verified requests</li>
                            </ul>

                        </div>

                        <div className="">
                            <button type="submit" className="bg-blood-primary active:scale-95 cursor-pointer w-full mt-7 p-3 rounded-2xl">
                                <div className="flex items-center justify-center gap-3">
                                    <div><Icon icon="solar:user-plus-rounded-linear" className="text-white w-9 h-9" /></div>

                                    <div className="text-white text-xl font-bold">Complete Registration</div>
                                </div>
                            </button>
                        </div>
                    </form>
                </>
            )}

            {inCompleteSubmission && (
                <div className="fixed z-10000 inset-0 flex justify-center items-center">

                    <div onClick={() => { setInCompleteSubmission(false) }} className="absolute inset-0 bg-gray-900/60" />

                    <div className="relative bg-white rounded-xl p-8 flex items-center gap-5">
                        <button onClick={() => { setInCompleteSubmission(false) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>

                        <div>
                            <Icon icon="subway:missing" className="h-10 w-10 text-blood-primary" />
                        </div>

                        <div className="font-bold text-xl">Incomplete form submission</div>
                    </div>

                </div>
            )}


            {registrationSuccess && (

                <>
                    <div className="absolute inset-0" />
                    <div className="relative bg-white p-6 rounded-xl">

                        <div className="flex flex-col gap-5 justify-center items-center">
                            <div>
                                <Icon icon="charm:circle-tick" className="w-12 h-12 text-green-600" />
                            </div>

                            <div className="text-center">
                                <div className="text-xl font-bold">Registration Successful!</div>
                                <div className="max-w-150 px-20">Thank you for registering as a blood donor. Your
                                    profile is now active and you may receive requests
                                    from people in need.</div>
                            </div>
                        </div>

                        <div className="p-3 mt-5 rounded-xl bg-blue-200">

                            <div className="text-sm font-bold">Whats Next?</div>

                            <ul className="text-sm mt-2 list-disc list-outside ml-5">
                                <li> You'll receive notifications when someone needs your
                                    blood type</li>
                                <li>Keep your availability status updated</li>
                                <li>Respond promptly to emergency requests</li>
                                <li>Update your last donation date after each donation</li>
                            </ul>

                        </div>

                        {/* <div className="">
                            <button onClick={() => setRegistrationSuccess(false)} className="bg-blood-primary active:scale-95 cursor-pointer w-full mt-7 p-3 rounded-2xl">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="text-white text-xl font-bold">Register Another Donor</div>
                                </div>
                            </button>
                        </div> */}
                    </div>
                </>

            )}


            {errorMessage && (
                <div className="fixed z-10000 inset-0 flex justify-center items-center">

                    <div onClick={() => { setErrorMessage(undefined) }} className="absolute inset-0 bg-gray-900/60" />

                    <div className="relative bg-white rounded-xl p-8 flex items-center gap-5">
                        <button onClick={() => { setErrorMessage(undefined) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>

                        <div>
                            <Icon icon="subway:missing" className="h-10 w-10 text-blood-primary" />
                        </div>

                        <div className="font-bold text-xl">{errorMessage}</div>
                    </div>

                </div>
            )}

        </main>
    )
}

export default RegisterDonor;