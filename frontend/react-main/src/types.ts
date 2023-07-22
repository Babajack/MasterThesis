export type LoadingStatus = "Idle" | "Pending" | "Success" | "Error";

export type UserRequest = {
	username: string;
	password: string;
};

export interface TaskResponse {
	taskID: string;
	description: string;
	defaultFiles: SandboxFiles;
	currentFiles?: SandboxFiles;
	successFiles?: SandboxFiles;
}

export type User = {
	username: string;
	id: string;
};

export type SandboxFiles = SandboxFile[];

export type SandboxFile = {
	filename: string;
	code: string;
	isDeletable?: boolean;
};

/* Data from Backend Types */

export type UserResponse =
	| {
			username: string;
			tasks?: {
				task: TaskSchema;
				solutionFiles: SandboxFiles;
				userFiles: SandboxFiles;
			}[];
	  }
	| { error: string };

export interface TaskSchema {
	index: number;
	category: TaskCategory;
	unlocks?: number[];
	unlocksCategories?: TaskCategory[];
	description: {
		displayType: TaskDescriptionDisplayType;
		text: string;
	}[];
	defaultFiles: SandboxFiles;
}

export type TaskDescriptionDisplayType = "description" | "code" | "hint";

export type TaskCategory = "JSX";
