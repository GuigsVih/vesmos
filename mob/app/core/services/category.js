import api from './api';

export const fetchCategories = () => {
    return api.get('/category');
}

export const fetchCategoryById = (categoryId) => {
    return api.get(`/category/${categoryId}`);
}