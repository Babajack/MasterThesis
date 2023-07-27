import mongoose from "mongoose";
import { CodeFile, CodeFiles } from "types";
import { TaskCategory, TaskSchema, getAllTasks } from "./task";
import { SandboxSchema, getDefaultSandbox } from "./sandbox";

export interface UserSchema {
	username: string;
	password: string;
	tasks: {
		task: mongoose.Schema.Types.ObjectId;
		userSolution?: CodeFiles;
		userCode?: CodeFiles;
		isUnlocked?: boolean;
	}[];
	sandbox: {
		sandboxId: mongoose.Schema.Types.ObjectId;
		userCode?: CodeFiles;
	};
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
		_id: false,
		type: [
			{
				_id: false,
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
	sandbox: {
		_id: false,
		type: {
			sandboxId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Sandbox",
				required: true,
			},
			userCode: {
				type: [{ filename: String, code: String }],
				default: [],
			},
		},
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
	return await User.findById(userId, "username tasks sandbox -_id").populate([
		{
			path: "tasks",
			populate: {
				path: "task",
				//select: "-_id -__v -unlocks -unlocksCategories -solutionFiles",
				select: "_id index title category isDefaultUnlocked",
			},
		},
	]);
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

export const addSandboxFiles = async (userId: string) => {
	const sandbox = await getDefaultSandbox();

	return await User.findByIdAndUpdate(userId, {
		$set: {
			"sandbox.sandboxId": sandbox?.id,
		},
	});
};

export const updateUserCode = async (userId: string, taskId: string, userCode: CodeFiles) => {
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
	userSolution: CodeFiles
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

export const updateSandboxCode = async (userId: string, userCode: CodeFiles) => {
	return await User.updateOne(
		{ _id: userId },
		{
			$set: {
				"sandbox.userCode": userCode,
			},
		}
	);
};
