import api from './api';

export function createAccount(args) {
    return api.post("/user", args);
}