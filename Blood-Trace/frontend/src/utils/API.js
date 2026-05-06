/**
 * Axios API Instance
 * Configures a custom Axios instance with base URL, timeout, and credentials
 * for consistent API requests to the backend.
 */
import axios from 'axios';


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default API;