/**
 * Accessibility Model
 * Defines the Mongoose schema for storing user accessibility preferences
 * such as high contrast, reduced motion, and text size.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessibilitySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        highContrast: {
            type: Boolean,
            default: false
        },
        reduceMotion: {
            type: Boolean,
            default: false
        },
        textSize: {
            type: String,
            enum: ['Normal', 'Large', 'Extra Large'],
            default: 'Normal'
        },
        simplifyUI: {
            type: Boolean,
            default: false
        },
        screenReader: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const AccessibilitySettings = mongoose.model('AccessibilitySettings', accessibilitySchema);

module.exports = AccessibilitySettings;
