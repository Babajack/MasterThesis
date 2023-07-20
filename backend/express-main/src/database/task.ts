import mongoose from "mongoose";
import { SandboxFiles } from "types";

export enum TaskDescriptionDisplayType {
	"description" = "description",
	"code" = "code",
	"hint" = "hint",
}

export type TaskCategory = "JSX";

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

const taskSchema = new mongoose.Schema<TaskSchema>({
	index: {
		type: Number,
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

export const getTasksByCategoryAndIndices = async (category: TaskCategory, indices: number[]) => {
	return await Task.find({
		category: category,
		index: {
			$in: indices,
		},
	});
};

export const getTasksByCategory = async (category: TaskCategory) => {
	return await Task.find({
		category: category,
	});
};
