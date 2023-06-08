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
	passwort: string;
};

export type User = {
	username: string;
	id: string;
};
