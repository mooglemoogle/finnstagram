import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.45:8000',
    headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
    },
});
