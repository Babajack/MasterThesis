import express from "express";
import { getUsersTask } from "../database/user";

export const taskRouter = express.Router();

/* taskRouter.post("/task/runCode", (req: Request<{}, {}, SandboxFiles>, res) => {
	try {
		updateSandboxCode(req.body, req.session.user?.id!);
		//updateSandboxCode([{ filename: "testfile", code: "console.log('hi')" }], req.session.user?.id!);
		res.send(true);
	} catch (error) {
		console.log(error);
		res.send(false);
	}
});

taskRouter.get("/docker/start", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	//startSandboxContainer(req.session.user?.id!);
	startSandboxContainer(req.session.user?.id!);
}); */

taskRouter.get("/task", async (req, res) => {
	try {
		const taskId = req.query.taskId as string;
		//const task = await getTaskById(taskId);
		const usersTask = await getUsersTask(req.session.userId!, taskId);

		if (!(usersTask?.task.isDefaultUnlocked || usersTask?.isUnlocked)) {
			res.status(401).send({ error: "Aufgabe nicht freigeschaltet!" });
			//res.send({ error: "error" });
			return;
		}
		// save current task to session
		req.session.currentTaskId = taskId;
		//req.session.save();

		res.send(usersTask);
	} catch (error) {
		res.status(404).send({ error: error });
	}
	// try {
	// 	const taskId = req.query.taskId as string;
	// 	const task = await getTaskById(taskId);
	// 	if (!task?.isDefaultUnlocked) {
	// 		const isUnlocked = await getIsTaskUnlocked(req.session.userId!, taskId);
	// 		if (!isUnlocked) {
	// 			res.status(401).send({ error: "Aufgabe nicht freigeschaltet!" });
	// 			// BUG: status setzen ???
	// 			//res.send({ error: "error" });
	// 			return;
	// 		}
	// 	}
	// 	res.send(task);
	// } catch (error) {
	// 	res.status(404).send({ error: error });
	// }
});

// taskRouter.post(
// 	"/task/runCode",
// 	async (req: Request<{}, {}, SandboxFiles>, res: Response<string>) => {
// 		const response = await runCode(req.body, req.session.userId!);
// 		console.log(response.data);
// 		res.send(response.data);
// 	}
// );
