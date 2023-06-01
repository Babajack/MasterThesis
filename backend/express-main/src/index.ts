import express from "express";
import {
	runTest,
	initDockerControl,
	listContainers,
	startSandboxContainer,
	updateSandboxCode,
} from "./docker/dockerControl";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 8000;

app.use(session({ secret: process.env.SECRET }));

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
