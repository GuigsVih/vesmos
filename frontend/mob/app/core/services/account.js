import api from './api';

export const fetchAccounts = () => {
    return api.get("account");
}

export const fetchAccountsUsage = () => {
    return api.get("account/usage");
}