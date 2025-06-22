import api from './api';

export const fetchCompanies = () => {
    return api.get('/company');
}