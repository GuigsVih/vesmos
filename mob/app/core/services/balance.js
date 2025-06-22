import api from './api';

export const fetchBalances = (filterDate) => {
    return api.get('/balance', { params: filterDate });
}