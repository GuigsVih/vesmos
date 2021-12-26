import api from "./api";

export function fetchReleases(params) {
	return api.get("/release", { params: params });
}

export function createRelease(params) {
	return api.post("/release", params);
}