import api from "./api";

export function fetchReleases(params) {
	console.log(params);
    return api.get("/release", { params: params });
} 