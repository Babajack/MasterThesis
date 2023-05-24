import express from "express";
import { cleanup, executeTask, initDockerControl, listContainers } from "../src/dockerControl";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/docker", (req, res) => {
	res.send("starting docker...");
	executeTask();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	initDockerControl();
});