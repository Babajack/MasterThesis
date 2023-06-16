import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL!;
axios.defaults.baseURL = "http://localhost:8000"; //`http://${BASE_URL}`;

axios.interceptors.request.use((request) => {
	//console.log("Starting Request", JSON.stringify(request, null, 2));
	console.log("Starting Request", request.method, request.url, request);
	return request;
});

axios.interceptors.response.use((response) => {
	//console.log("Response:", JSON.stringify(response, null, 2));
	console.log("Response:", response.config.method, response.config.url, response);
	return response;
});

export const httpRequest = {
	async getUserData() {
		return axios.get("/user");
	},
	async loginUser(username: string, passwort: string) {
		return axios.post(
			"/login",
			{},
			{
				auth: {
					username: username,
					password: passwort,
				},
			}
		);
	},
	async registerUser(username: string, passwort: string) {
		return axios.post(
			"/register",
			{},
			{
				auth: {
					username: username,
					password: passwort,
				},
			}
		);
	},
};
