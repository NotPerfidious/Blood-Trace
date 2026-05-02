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