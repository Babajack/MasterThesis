import { startSandboxContainer, updateSandboxCode } from "../docker/dockerControl";
import express from "express";

export const dockerRouter = express.Router();

dockerRouter.post("/docker/data", (req, res) => {
	res.send("starting docker...");
	//executeTask();

	updateSandboxCode(
		[{ filename: "testfile", code: "console.log('testcode')" }],
		req.session.user?.id!
	);
});

dockerRouter.get("/docker/start", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	//startSandboxContainer(req.session.user?.id!);
	startSandboxContainer(req.session.user?.id!);
});
