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
import { Request, Response } from "express";
import { getConnection } from "../src/database/database";
import { createNewUser } from "../src/database/user";
import { login } from "../src/database/auth";
import { User, UserRequest } from "types";
import { error } from "console";

// env variables
dotenv.config();

// db connection
const connection = getConnection().then((c) => c.connection.getClient());

const app = express();
const port = 8000;

app.use(
	session({
		secret: process.env.SECRET!,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			clientPromise: connection,
			dbName: process.env.MONGODB_DB_NAME,
			ttl: 14 * 24 * 60 * 60,
			autoRemove: "native",
		}),
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
	createNewUser("testname", "testpasswort")
		.then((user) => console.log(user))
		.catch((error) => console.log(error));
});

app.get("/login", (req: Request<{}, {}, UserRequest>, res: Response) => {
	login(req)
		.then((result) => {
			if (result) {
				// user found
				// TODO return success info?
			} else {
				// user not found
				// TODO return error info?
			}
		})
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
