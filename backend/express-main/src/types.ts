// typescript session interface
declare module "express-session" {
	interface SessionData {
		user: User;
	}
}

export type SandboxFiles = {
	filename: string;
	code: string;
}[];

export type UserRequest = {
	username: string;
	password: string;
};

export type User = {
	username: string;
	id: string;
};

export interface TaskResponse {
	taskID: string;
	description: string;
	defaultFiles: SandboxFiles;
	currentFiles?: SandboxFiles;
	successFiles?: SandboxFiles;
}

export interface TaskRequest {
	taskID: string;
}
