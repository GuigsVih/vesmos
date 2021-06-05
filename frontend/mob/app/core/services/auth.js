import api from "./api";

export function login(args) {
    return api.post("/auth", args);
} 