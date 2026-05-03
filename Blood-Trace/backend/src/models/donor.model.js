/**
 * Donor Model
 * Defines the Mongoose schema for donor profiles, including personal info,
 * blood type, geospatial location, contact details, and notification preferences.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        bloodType: {
            type: String,
            enum: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
            required: true,
            index: true
        },
        
        city: {
            type: String,
            required: true,
            trim: true
        },

        area: {
            type: String,
            required: true,
            trim: true
        },

        geolocation: {
            type: [Number],
            required: true,
            index: '2dsphere',
            validate: {
                validator: (v) => {
                    const [lng, lat] = v;

                    return v.length == 2 && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;

                },
                message: 'Coordinates must be an array of 2 numbers [longitude, latitude] within valid ranges.'
            }
        },

        contactNumber: {
            type: String,
            trim: true,
            required: true,
            validate: {
                validator: (v) => {
                    const cleaned = v.replace(/[\s-]/g, ''); // Remove spaces and hyphens
                    return /^(\+92|0|92)?3\d{9}$/.test(cleaned);
                },
                message: 'Please enter a valid Pakistani mobile number (e.g., 0300-1234567).'
            }
        },

        isAvailable: {
            type: Boolean,
            required: true,
            default: true
        },

        emailNotification: {
            type: Boolean,
            default: true
        },

        smsNotification: {
            type: Boolean,
            default: false
        },

        pushNotification: {
            type: Boolean,
            default: true
        },

        lastDonationDate: {
            type: Date,
            required: false,
            default: null
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);


const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;