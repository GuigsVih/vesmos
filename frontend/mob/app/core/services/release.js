import api from "./api";

export function fetchReleases() {
    return api.get("/release");
} 