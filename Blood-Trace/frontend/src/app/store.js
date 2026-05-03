/**
 * Redux Store Configuration
 * Centralizes the application's state management by combining reducers for
 * authentication and accessibility settings.
 */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js';
import accessibilityReducer from '../features/accessibility/accessibilitySlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        accessibility: accessibilityReducer
    }
})

export default store;