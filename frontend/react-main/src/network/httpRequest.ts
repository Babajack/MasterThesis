import axios from "axios";
import { SandboxFiles, UserRequest } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL!;
axios.defaults.baseURL = "http://localhost:8000"; //`http://${BASE_URL}`;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
	//console.log("Starting Request", JSON.stringify(request, null, 2));
	//if (process.env.REACT_APP_DEV_MODE)
	console.log("Starting Request", request.method, request.url, request);
	return request;
});

axios.interceptors.response.use(
	(response) => {
		//console.log("Response:", JSON.stringify(response, null, 2));
		//if (process.env.REACT_APP_DEV_MODE)
		console.log("Response:", response.config.method, response.config.url, response);
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			window.location.href = "/";
		}
		if (process.env.REACT_APP_DEV_MODE) console.log(error);
	}
);

export const httpRequest = {
	async getUserData() {
		return axios.get("/user");
	},
	async loginUser(username: string, password: string) {
		return axios.post<UserRequest>("/auth/login", {
			username: username,
			password: password,
		});
	},
	async registerUser(username: string, password: string) {
		return axios.post<UserRequest>("/auth/register", {
			username: username,
			password: password,
		});
	},
	async logout() {
		return axios.post("/auth/logout");
	},
	async startDocker() {
		return axios.post("/docker/data");
	},
	async updateCode(files: SandboxFiles) {
		return axios.post("/sessionContainer/updateCode", files);
	},

	async fetchTask(taskID: string) {
		return axios.get("/task", {
			params: {
				taskID: taskID,
			},
		});
	},
};
