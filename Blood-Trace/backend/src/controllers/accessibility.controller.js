const AccessibilitySettings = require('../models/accessibility.model');

/**
 * @desc    Get accessibility settings for the logged-in user
 * @route   GET /api/v1/accessibility
 * @access  Private
 */
const getSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        let settings = await AccessibilitySettings.findOne({ user: userId });

        // If no settings document exists yet, return default settings
        if (!settings) {
            return res.status(200).json({
                message: 'No settings found, returning defaults.',
                settings: {
                    highContrast: false,
                    reduceMotion: false,
                    textSize: 'Normal',
                    simplifyUI: false,
                    screenReader: false
                }
            });
        }

        return res.status(200).json({
            message: 'Accessibility settings retrieved successfully.',
            settings: {
                highContrast: settings.highContrast,
                reduceMotion: settings.reduceMotion,
                textSize: settings.textSize,
                simplifyUI: settings.simplifyUI,
                screenReader: settings.screenReader
            }
        });

    } catch (error) {
        console.error('Error in getSettings:', error);
        return res.status(500).json({
            message: 'Internal server error while retrieving settings.',
            error: error.message
        });
    }
};

/**
 * @desc    Create or update accessibility settings for the logged-in user
 * @route   PUT /api/v1/accessibility
 * @access  Private
 */
const updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { highContrast, reduceMotion, textSize, simplifyUI, screenReader } = req.body;

        // Build the update object with only provided fields
        const updateData = {};
        if (highContrast !== undefined) updateData.highContrast = highContrast;
        if (reduceMotion !== undefined) updateData.reduceMotion = reduceMotion;
        if (textSize !== undefined) updateData.textSize = textSize;
        if (simplifyUI !== undefined) updateData.simplifyUI = simplifyUI;
        if (screenReader !== undefined) updateData.screenReader = screenReader;

        // Upsert: create if not exists, update if exists
        const settings = await AccessibilitySettings.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            {
                new: true,          // return the updated document
                upsert: true,       // create if not found
                runValidators: true // run schema validators on update
            }
        );

        return res.status(200).json({
            message: 'Accessibility settings saved successfully.',
            settings: {
                highContrast: settings.highContrast,
                reduceMotion: settings.reduceMotion,
                textSize: settings.textSize,
                simplifyUI: settings.simplifyUI,
                screenReader: settings.screenReader
            }
        });

    } catch (error) {
        console.error('Error in updateSettings:', error);
        return res.status(500).json({
            message: 'Internal server error while saving settings.',
            error: error.message
        });
    }
};

module.exports = { getSettings, updateSettings };
