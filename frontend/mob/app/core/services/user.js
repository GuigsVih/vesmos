import api from './api';

export function createUser(args) {
    return api.post("/user", args);
}