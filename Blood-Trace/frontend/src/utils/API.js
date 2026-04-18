import axios from 'axios';


const API = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default API;