import mongoose from "mongoose";
import { CodeFiles } from "types";

export enum TaskDescriptionDisplayType {
	"description" = "description",
	"code" = "code",
	"hint" = "hint",
}

export type TaskCategory = "JSX" | "State";

export interface TaskSchema {
	index: number;
	title: string;
	category: TaskCategory;
	unlocks?: number[];
	unlocksCategories?: TaskCategory[];
	isDefaultUnlocked?: boolean;
	description: {
		displayType: TaskDescriptionDisplayType;
		text: string;
	}[];
	defaultFiles: CodeFiles;
	solutionFiles: CodeFiles;
}

const taskSchema = new mongoose.Schema<TaskSchema>({
	index: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	unlocks: {
		type: [Number],
	},
	unlocksCategories: {
		type: [String],
	},
	isDefaultUnlocked: {
		type: Boolean,
	},
	description: {
		type: [
			{
				displayType: {
					type: String,
					enum: Object.values(TaskDescriptionDisplayType),
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
	defaultFiles: {
		type: [
			{
				filename: {
					type: String,
					required: true,
				},
				code: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
	solutionFiles: {
		type: [
			{
				filename: {
					type: String,
					required: true,
				},
				code: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
});

export const Task = mongoose.model("Task", taskSchema);

export const populateDatabase = async (tasks: TaskSchema[]) => {
	for (let task of tasks) {
		await createNewTask(task);
	}
};

export const createNewTask = async (task: TaskSchema) => {
	return await Task.findOneAndUpdate({ category: task.category, index: task.index }, task, {
		upsert: true,
		runValidators: true,
	});
};

export const getTaskByCategoryAndIndex = async (category: TaskCategory, index: number) => {
	return await Task.findOne({
		category: category,
		index: index,
	});
};

export const getTaskById = async (taskId: string) => {
	return await Task.findById(taskId);
};

export const getAllTasks = async (filter?: string | string[]) => {
	return await Task.find({}, filter ?? "");
};

// export const getTasksByCategoryAndIndices = async (category: TaskCategory, indices: number[]) => {
// 	return await Task.find({
// 		category: category,
// 		index: {
// 			$in: indices,
// 		},
// 	});
// };

// export const getTasksByCategory = async (category: TaskCategory) => {
// 	return await Task.find({
// 		category: category,
// 	});
// };
