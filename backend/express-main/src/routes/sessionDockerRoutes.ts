import { getTaskById } from "../database/task";
import express from "express";

export const sessionDockerRouter = express.Router();

sessionDockerRouter.use((req, res, next) => {
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
