import mongoose from "mongoose";
import { SandboxFiles } from "types";
import { TaskCategory, TaskSchema, getAllTasks } from "./task";

export interface UserSchema {
	username: string;
	password: string;
	tasks: {
		task: TaskSchema;
		userSolution?: SandboxFiles;
		userCode?: SandboxFiles;
		isUnlocked?: boolean;
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
	tasks: {
		type: [
			{
				task: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Task",
					required: true,
				},
				userSolution: {
					type: [{ filename: String, code: String }],
					default: [],
				},
				userCode: {
					type: [{ filename: String, code: String }],
					default: [],
				},
				isUnlocked: {
					type: Boolean,
					default: false,
				},
			},
		],
		default: [],
	},
});

const User = mongoose.model("User", userSchema);

export const createNewUser = async (username: string, password: string) => {
	return await User.create({
		username: username,
		password: password,
	});
};

export const getUserByUsername = async (username: string) => {
	return await User.findOne({
		username: username,
	});
};

export const getUserData = async (userId: string) => {
	return await User.findById(userId, "username tasks").populate({
		path: "tasks",
		populate: {
			path: "task",
			select: "-_id -__v -unlocks -unlocksCategories -solutionFiles",
		},
	});
};

export const addNewlyCreatedTasks = async (userId: string) => {
	const allTasks = await getAllTasks();
	const taskIds = allTasks.map((task) => task._id.toString());

	const user = await User.findById(userId);

	const filteredTaskIds = taskIds.filter(
		(taskId) =>
			!user?.tasks.some((elem) => {
				return elem.task.toString() === taskId;
			})
	);

	return await User.findByIdAndUpdate(userId, {
		$addToSet: {
			tasks: {
				$each: filteredTaskIds.map((taskId) => {
					return { task: taskId };
				}),
			},
		},
	});
};

export const updateUserCode = async (userId: string, taskId: string, userCode: SandboxFiles) => {
	return await User.updateOne(
		{ _id: userId, "tasks.id": taskId },
		{
			$set: {
				"tasks.$.userCode": userCode,
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
		{ _id: userId, "tasks.id": taskId },
		{
			$set: {
				"tasks.$.userSolution": userSolution,
			},
		}
	);
};

export const unlockTask = async (userId: string, category: string, index: number) => {
	return await User.updateOne(
		{ _id: userId, "task.category": category, "task.index": index },
		{
			$set: {
				"tasks.$.isUnlocked": true,
			},
		}
	);
};
