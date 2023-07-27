// typescript session interface
declare module "express-session" {
	interface SessionData {
		userId: string;
	}
}

export type CodeFile = {
	filename: string;
	code: string;
};

export type CodeFiles = CodeFile[];

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
	defaultFiles: CodeFiles;
	currentFiles?: CodeFiles;
	successFiles?: CodeFiles;
}

export interface TaskRequest {
	taskID: string;
}
