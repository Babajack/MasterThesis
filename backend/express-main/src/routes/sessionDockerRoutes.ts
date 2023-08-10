import { updateUserCode } from "../database/user";
import { getTaskById } from "../database/task";
import express from "express";

export const sessionDockerRouter = express.Router();

sessionDockerRouter.use((req, res, next) => {
	if (req.path === "/runTest" || req.path === "/runCode") {
		// save user code to db
		updateUserCode(
			req.session.userId!,
			req.query.taskId as string,
			req.body,
			req.query.type as string
		);
	}
	// find task by id, add to the path so we can find the corresponding test
	if (req.path === "/runTest") {
		const taskId = req.query.taskId as string;
		getTaskById(taskId)
			.then((task) => {
				const taskRef = task?.category + "_" + task?.index;
				req.query.path = taskRef;
			})
			.finally(() => next());
	} else {
		next();
	}
});
