/**
 * Accessibility Routes
 * Defines API endpoints for fetching and updating user-specific accessibility settings.
 */
const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/accessibility.controller');

// Protected routes (middleware will be applied in app.js)
router.get('/', getSettings);
router.put('/', updateSettings);

module.exports = router;
