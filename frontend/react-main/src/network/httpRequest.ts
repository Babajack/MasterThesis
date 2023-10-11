import axios, { AxiosResponse } from "axios";
import { CodeType, CodeFiles, UserRequest, UserResponse } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL!;
axios.defaults.baseURL = "http://localhost:8000"; //`http://${BASE_URL}`;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
	//console.log("Starting Request", JSON.stringify(request, null, 2));
	if (process.env.REACT_APP_DEV_MODE)
		console.log("Starting Request", request.method, request.url, request);
	return request;
});

axios.interceptors.response.use(
	(response) => {
		//console.log("Response:", JSON.stringify(response, null, 2));
		if (process.env.REACT_APP_DEV_MODE)
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
	async getUserData(): Promise<AxiosResponse<UserResponse, UserResponse>> {
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
	async runCode(files: CodeFiles, type: CodeType, taskId?: string) {
		return axios.post("/sessionContainer/runCode", files, {
			params: { type: type, taskId: taskId },
		});
	},
	async updateUserCode(files: CodeFiles, type: CodeType, taskId?: string) {
		return axios.post("/user/updateUserCode", files, {
			params: { type: type, taskId: taskId },
		});
	},
	async runTest(files: CodeFiles, taskId: string) {
		return axios.post("/sessionContainer/runTest", files, { params: { taskId: taskId } });
	},

	async fetchTask(taskId: string) {
		return axios.get("/task", {
			params: {
				taskId: taskId,
			},
		});
	},
	async fetchSandbox(sandboxId: string) {
		return axios.get("/sandbox", {
			params: {
				sandboxId: sandboxId,
			},
		});
	},
};
