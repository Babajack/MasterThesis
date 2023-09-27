import mongoose from "mongoose";
import { CodeFiles } from "types";
import { SandboxSchema, getDefaultSandbox } from "./sandbox";
import { TaskSchema, getAllTasks, getTaskById, getTasksByUnlocksList } from "./task";

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
		sandboxId: SandboxSchema;
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
	sandbox: {
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
	// only send solution to user if task is solved already
	if (task && task.userSolution) {
		if (task.userSolution.length === 0) {
			task.task.solutionFiles = [];
		}
	}

	return task;
};
export const getUsersSandbox = async (userId: string) => {
	return await User.findById(userId, "sandbox").populate({
		path: "sandbox",
		populate: {
			path: "sandboxId",
		},
	});
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

export const updateUserCode = async (
	userId: string,
	taskId: string,
	userCode: CodeFiles,
	type: string
) => {
	if (type === "task")
		return await User.updateOne(
			{ _id: userId, "tasks.task": taskId },
			{
				$set: {
					"tasks.$.userCode": userCode,
				},
			}
		);
	else if (type === "sandbox")
		return await User.updateOne(
			{ _id: userId },
			{
				$set: {
					"sandbox.userCode": userCode,
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
		{ _id: userId, "tasks.task": taskId },
		{
			$set: {
				"tasks.$.userSolution": userSolution,
			},
		}
	);
};

export const handleUserPassedTask = async (userId: string, taskId: string, files: CodeFiles) => {
	const user = await User.findById(userId);
	const task = await getTaskById(taskId);

	if (user) {
		if (task?.unlocks && task.unlocks.length > 0) {
			// unlock new tasks
			const unlockedTasksIds = (await getTasksByUnlocksList(task.unlocks)).map((taskId) =>
				taskId._id.toString()
			);
			const updatedTasks = user.tasks.map((task) => {
				if (task.task && unlockedTasksIds.includes(task.task.toString())) {
					task.isUnlocked = true;
				}

				return task;
			});
			user.tasks = updatedTasks;
			await user.save();
		}

		await updateUserSolution(userId, taskId, files);
	}
};
