const Donor = require('../models/donor.model');


const registerDonor = async (req, res) => {

    try {

        const { name, bloodType, geolocation, contactNumber, isAvailable, lastDonationDate } = req.body;

        if (!name || !bloodType || !geolocation || !contactNumber || isAvailable == undefined) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const alreadyRegistered = await Donor.findOne({ user: req.user?.id });

        if (alreadyRegistered) {
            return res.status(400).json({
                message: "You are already registered as donor"
            })
        }

        const donor = await Donor.create({
            name,
            bloodType,
            geolocation,
            contactNumber,
            isAvailable,
            ...(lastDonationDate && { lastDonationDate }), // If 'lastDonationDate' is missing from req.body, it won't be added to the new object
            user: req.user.id
        })

        return res.status(201).json({
            message: 'Donor registration successfull'
        })

    } catch (error) {
        console.log(`[ERROR in registerDonor]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}


const isUserDonor = async (req, res) => {
    try {

        const donor = await Donor.findOne({ user: req.user.id });

        return res.status(200).json({
            message: donor ? "User is a registered donor" : "User is not a registered donor",
            isDonor: !!donor
        })

    } catch (error) {
        console.log(`[ERROR in isUserDonor]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getDonors = async (req, res) => {
    try {

        const validCoordinates = (lng, lat) => {
            return Number.isFinite(lng) && Number.isFinite(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
        }

        const { lng, lat, radius } = req.query;

        const numLng = parseFloat(lng);
        const numLat = parseFloat(lat);
        const numRadius = parseFloat(radius);


        if (isNaN(numLng) || isNaN(numLat) || !validCoordinates(numLng, numLat)) {
            return res.status(400).json({
                message: "Invalid center coordinates"
            })
        }

        const donors = await Donor.find({
            geolocation: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [numLng, numLat]
                    },
                    $maxDistance: (numRadius || 5) * 1000 //Default to 5km if radius not provided
                }
            }
        })

        return res.status(200).json({

            message: `Found ${donors.length} donors in ${(numRadius || 5)}km raius`,
            donors
        })

    } catch (error) {
        console.log(`[ERROR in getDonors]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { registerDonor, isUserDonor, getDonors };