export type LoadingStatus = "Idle" | "Pending" | "Success" | "Error";

export type UserRequest = {
	username: string;
	password: string;
};

export type User = {
	username: string;
	id: string;
};

export type CodeFiles = CodeFile[];

export type CodeFile = {
	filename: string;
	code: string;
	isDeletable?: boolean;
};

export type Errors = {
	filename: string;
	errors: { message: string; line: number }[];
}[];

export type CodeType = "task" | "sandbox";

/* Data from Backend Types */

export type UserResponse = UserSchemaFrontend | { error: string };

export interface UserSchemaFrontend {
	username: string;
	tasks: TaskHead[];
	sandbox: Sandbox;
	currentTaskId?: string;
}

export interface TaskHead {
	task: TaskSchemaFrontend;
	isUnlocked?: boolean;
}

export type TaskResponse = Task; //| { error: string };

export interface Task {
	task: TaskSchemaFrontend;
	userSolution?: CodeFiles;
	userCode?: CodeFiles;
	isUnlocked?: boolean;
}

export interface TaskSchemaFrontend {
	_id: string;
	index: number;
	category: TaskCategory;
	title: string;
	isDefaultUnlocked?: boolean;
	description?: {
		displayType: TaskDescriptionDisplayType;
		text: string;
	}[];
	defaultFiles?: CodeFiles;
	solutionFiles?: CodeFiles;
}

export type TaskDescriptionDisplayType = "description" | "code" | "hint";

export type TaskCategory = string; //"JSX";

export interface Sandbox {
	sandboxId: string;
	userCode?: CodeFiles;
}

export interface SandboxSchemaFrontend {
	defaultFiles?: CodeFiles;
}

export type SandboxResponse = SandboxSchemaFrontend;
