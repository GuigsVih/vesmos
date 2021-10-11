import api from './api';

export const fetchCategories = () => {
    return api.get('/category');
}