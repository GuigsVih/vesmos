import api from './api';

export const fetchCreditCardsUsage = () => {
    return api.get("/credit-card/usage");
};