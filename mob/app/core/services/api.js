import axios from 'axios';
import { env } from '../environment';

export default axios.create({
    baseURL: env.apiUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});