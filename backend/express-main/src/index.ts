import express from "express";
import {
	runTest,
	initDockerControl,
	listContainers,
	startSandboxContainer,
	updateSandboxCode,
} from "./docker/dockerControl";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/docker", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	updateSandboxCode([{ filename: "testfile", code: "console.log('testcode')" }]);
});

app.get("/docker/start", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	startSandboxContainer();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	//initDockerControl();
});
