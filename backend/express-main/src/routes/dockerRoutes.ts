import { runCode, startSandboxContainer, updateSandboxCode } from "../docker/dockerControl";
import express from "express";

export const dockerRouter = express.Router();

dockerRouter.get("/docker/data", async (req, res) => {
	//res.send("starting docker...");
	//executeTask();

	/* updateSandboxCode(
		[{ filename: "testfile", code: "console.log('testcode')" }],
		req.session.user?.id!
	); */
	//await runCode([{ filename: "testfile", code: "console.log('testcode')" }], req.session.user?.id!);

	res.send("done");
});

dockerRouter.get("/docker/start", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	//startSandboxContainer(req.session.user?.id!);
	startSandboxContainer(req.session.user?.id!);
});
