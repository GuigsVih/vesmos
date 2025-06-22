import api from './api';

export const fetchCreditCardsUsage = () => {
    return api.get("/credit-card/usage");
};

export const createCreditCard = (data) => {
    return api.post("/credit-card", data);
}