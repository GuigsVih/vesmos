import api from './api';

export const createAccount = (params) => {
    return api.post("account", params);
}

export const fetchAccounts = () => {
    return api.get("account");
}

export const fetchAccountsUsage = () => {
    return api.get("account/usage");
}