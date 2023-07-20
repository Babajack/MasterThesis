import express, { Request, Response } from "express";
import { SandboxFiles, TaskRequest, TaskResponse } from "types";
import { runCode } from "../docker/dockerControl";

export const taskRouter = express.Router();

/* taskRouter.post("/task/updateCode", (req: Request<{}, {}, SandboxFiles>, res) => {
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

taskRouter.get("/task", (req: Request<TaskRequest, {}, {}>, res: Response<TaskResponse>) => {
	// TODO: get task by taskID, data access ...
	res.send({
		taskID: "testID",
		defaultFiles: [{ filename: "app.js", code: "" }],
		description: "empty description",
	});
});

taskRouter.post(
	"/task/updateCode",
	async (req: Request<{}, {}, SandboxFiles>, res: Response<string>) => {
		const response = await runCode(req.body, req.session.userId!);
		console.log(response.data);
		res.send(response.data);
	}
);
