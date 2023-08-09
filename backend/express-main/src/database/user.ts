import mongoose from "mongoose";
import { CodeFile, CodeFiles } from "types";
import { TaskCategory, TaskSchema, getAllTasks, getTaskById, getTasksByUnlocksList } from "./task";
import { SandboxSchema, getDefaultSandbox } from "./sandbox";

export interface UserSchema {
	username: string;
	password: string;
	tasks: {
		task: TaskSchema;
		userSolution?: CodeFiles;
		userCode?: CodeFiles;
		isUnlocked?: boolean;
	}[];
	sandbox: {
		sandboxId: mongoose.Schema.Types.ObjectId;
		userCode?: CodeFiles;
	};
	currentTaskId?: string;
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

export const getIsTaskUnlocked = async (userId: string, taskId: string) => {
	const user = await User.findOne({ _id: userId, "tasks.task": taskId }, { "tasks.$": 1 });
	return user?.tasks.at(0)?.isUnlocked;
};

export const getUsersTask = async (userId: string, taskId: string) => {
	const user = await User.findOne({ _id: userId, "tasks.task": taskId }, { "tasks.$": 1 }).populate(
		{
			path: "tasks",
			populate: {
				path: "task",
				//select: "_id index title category isDefaultUnlocked",
			},
		}
	);
	const task = user?.tasks.at(0);
	if (task && task.userSolution) {
		if (task.userSolution.length === 0) {
			task.task.solutionFiles = [];
		}
	}

	return task;
};

export const getUserData = async (userId: string) => {
	return await User.findById(userId, "username tasks sandbox -_id").populate(
		"tasks.task",
		"_id index title category isDefaultUnlocked"
	);

	// const user = await User.findById(userId, "username tasks sandbox -_id").populate([
	// 	{
	// 		path: "tasks",
	// 		select: "-tasks._id",
	// 		populate: {
	// 			path: "task",
	// 			//select: "-_id -__v -unlocks -unlocksCategories -solutionFiles",
	// 			select: "_id index title category isDefaultUnlocked",
	// 		},
	// 	},
	// ]);
	// console.log(user);

	// return user;
	//.select("-tasks.userCode");
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
		{ _id: userId, "tasks.task._id": taskId },
		{
			$set: {
				"tasks.$.userSolution": userSolution,
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

export const unlockTasksFromTask = async (userId: string, taskId: string) => {
	const task = await getTaskById(taskId);
	if (task?.unlocks) {
		const unlockedTasksIds = (await getTasksByUnlocksList(task.unlocks)).map((taskId) =>
			taskId._id.toString()
		);

		const user = await User.findById(userId);
		if (user) {
			const updatedTasks = user.tasks.map((task) => {
				if (task.task && unlockedTasksIds.includes(task.task.toString())) {
					task.isUnlocked = true;
				}

				return task;
			});
			user.tasks = updatedTasks;

			await user.save();
		}
	}
};
