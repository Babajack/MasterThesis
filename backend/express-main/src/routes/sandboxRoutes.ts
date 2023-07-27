import { getSandbox } from "../database/sandbox";
import express from "express";

export const sandboxRouter = express.Router();

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

sandboxRouter.get("/sandbox", async (req, res) => {
	try {
		const sandboxId = req.query.sandboxId as string;
		const sandbox = await getSandbox(sandboxId);
		res.send({ defaultFiles: sandbox?.defaultFiles });
	} catch (error) {
		res.send({ error: error });
	}
});

// sandboxRouter.post(
// 	"/sandbox/updateCode",
// 	async (req: Request<{}, {}, SandboxFiles>, res: Response<string>) => {
// 		const response = await runCode(req.body, req.session.userId!);
// 		console.log(response.data);
// 		res.send(response.data);
// 	}
// );
