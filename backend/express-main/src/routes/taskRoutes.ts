import { SandboxFiles } from "types";
import { startSandboxContainer, updateSandboxCode } from "../docker/dockerControl";
import express, { Request } from "express";

export const taskRouter = express.Router();

taskRouter.post("/task/updateCode", (req: Request<{}, {}, SandboxFiles>, res) => {
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
});
