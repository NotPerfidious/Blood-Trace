import { createSlice } from '@reduxjs/toolkit'
import checkAuth from './checkAuth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }

    },
    extraReducers: (builder)=>{
        builder
                .addCase(checkAuth.pending, (state)=>{
                    state.loading = true;
                })
                .addCase(checkAuth.fulfilled, (state, action)=>{
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload;
                })
                .addCase(checkAuth.rejected, (state, action)=>{
                    state.loading = false;
                    state.error = action.payload;
                    state.isAuthenticated = false;
                    state.user = null;
                })
    }
})

export const { setUser, setLoading, setError, setIsAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer