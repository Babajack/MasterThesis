import mongoose from "mongoose";
import {
	TaskCategory,
	getTaskByCategoryAndIndex,
	getTasksByCategoryAndIndices,
	Task,
	TaskSchema,
} from "./task";
import { SandboxFiles } from "types";

export interface UserSchema {
	username: string;
	password: string;
	availableTasks: {
		task: TaskSchema;
		solutionFiles: SandboxFiles;
		userFiles: SandboxFiles;
	}[];
}

const userSchema = new mongoose.Schema<UserSchema>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	availableTasks: [
		{
			task: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
				required: true,
			},
			userSolution: [{ filename: String, code: String }],
			userCode: [{ filename: String, code: String }],
		},
	],
});

const User = mongoose.model("User", userSchema);

export const createNewUser = async (username: string, password: string) => {
	// set default tasks
	const tasks = await getDefaultTasks();
	return await User.create({
		username: username,
		password: password,
		availableTasks: tasks.map((task) => {
			return { task: task?.id, userFiles: [], solutionFiles: [] };
		}),
	});
};

export const getUserByUsername = async (username: string) => {
	return await User.findOne({
		username: username,
	});
};

export const getUserData = async (userId: string) => {
	const user = await User.findById(userId).populate({
		path: "availableTasks",
		populate: {
			path: "task",
			select: "-_id -__v",
		},
	});

	return { username: user?.username, availableTasks: user?.availableTasks };
};

export const addAvailableTasks = async (
	userId: string,
	category: TaskCategory,
	taskIndices: number[]
) => {
	const tasks = await getTasksByCategoryAndIndices(category, taskIndices);
	const taskIds = tasks.map((elem) => elem._id);
	return await User.updateOne({ _id: userId }, { $push: { availableTasks: { $each: taskIds } } });
};

export const getDefaultTasks = async () => {
	const task = await getTaskByCategoryAndIndex("JSX", 0);
	return [task];
};

export const updateUserCode = async (userId: string, taskId: string, userCode: SandboxFiles) => {
	return await User.updateOne(
		{ _id: userId, "availableTasks.id": taskId },
		{
			$set: {
				"availableTasks.$.userCode": userCode,
			},
		}
	);
};

export const updateUserSolution = async (
	userId: string,
	taskId: string,
	userSolution: SandboxFiles
) => {
	return await User.updateOne(
		{ _id: userId, "availableTasks.id": taskId },
		{
			$set: {
				"availableTasks.$.userSolution": userSolution,
			},
		}
	);
};
