import api from "./api";

export function fetchReleases(params) {
	return api.get("/release", { params: params });
}