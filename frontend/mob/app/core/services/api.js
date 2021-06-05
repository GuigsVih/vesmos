import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://192.168.15.138:8080'
        : '',
    headers: {
        'Accept': 'application/json',
    },
});