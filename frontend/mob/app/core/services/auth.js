import api from "./api";

export function login(args) {
    return api.post("/auth", args);
}

export function me() {
    return api.get("/auth/me");
}