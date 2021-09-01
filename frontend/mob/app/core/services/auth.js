import api from "./api";

export function login(args) {
    return api.post("/auth", args);
}

export function getUserByToken() {
    console.log('here');
    return api.get("/auth/me");
}