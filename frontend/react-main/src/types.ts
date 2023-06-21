export type LoadingStatus = "Idle" | "Pending" | "Success" | "Error";

export type UserRequest = {
	username: string;
	password: string;
};

export interface UserResponse {
	username?: string;
	error?: string;
}

export type User = {
	username: string;
	id: string;
};

export type SandboxFiles = {
	filename: string;
	code: string;
}[];
