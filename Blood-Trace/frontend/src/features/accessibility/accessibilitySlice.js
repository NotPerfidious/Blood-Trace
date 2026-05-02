import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

const initialState = {
    highContrast: false,
    reduceMotion: false,
    textSize: 'Normal',
    simplifyUI: false,
    screenReader: false,
    loading: false,
    error: null
};

// Async thunk to fetch settings from backend
export const fetchAccessibilitySettings = createAsyncThunk(
    'accessibility/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/accessibility');
            return response.data.settings;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to update settings in backend
export const updateAccessibilitySettings = createAsyncThunk(
    'accessibility/updateSettings',
    async (settings, { rejectWithValue }) => {
        try {
            const response = await API.put('/accessibility', settings);
            return response.data.settings;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const accessibilitySlice = createSlice({
    name: 'accessibility',
    initialState,
    reducers: {
        resetAccessibility: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Settings
            .addCase(fetchAccessibilitySettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAccessibilitySettings.fulfilled, (state, action) => {
                state.loading = false;
                state.highContrast = action.payload.highContrast;
                state.reduceMotion = action.payload.reduceMotion;
                state.textSize = action.payload.textSize;
                state.simplifyUI = action.payload.simplifyUI;
                state.screenReader = action.payload.screenReader;
            })
            .addCase(fetchAccessibilitySettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Settings
            .addCase(updateAccessibilitySettings.fulfilled, (state, action) => {
                state.highContrast = action.payload.highContrast;
                state.reduceMotion = action.payload.reduceMotion;
                state.textSize = action.payload.textSize;
                state.simplifyUI = action.payload.simplifyUI;
                state.screenReader = action.payload.screenReader;
            });
    }
});

export const { resetAccessibility } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
