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
import { getConnection } from "../src/database/database";
import { createNewUser } from "../src/database/user";

// env variables
dotenv.config();

// db connection
const connection = getConnection();

const app = express();
const port = 8000;

app.use(
	session({
		secret: process.env.SECRET!,
		// @ts-ignore
		store: (await connection).connection.getClient(),
	})
);

app.get("/", (req, res) => {
	res.send("Hello World!");
	createNewUser("testname", "testpasswort")
		.then((user) => console.log(user))
		.catch((error) => console.log(error));
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
