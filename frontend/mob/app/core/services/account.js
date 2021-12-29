import api from './api';

export const fetchAccountsUsage = () => {
    return api.get("account/usage");
}