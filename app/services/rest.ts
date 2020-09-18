import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.5:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
    },
});
