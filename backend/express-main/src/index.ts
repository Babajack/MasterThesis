import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import { UserRequest } from "types";
import { login, register } from "../src/database/auth";
import { getSessionStore } from "../src/database/database";
import { startSandboxContainer, updateSandboxCode } from "./docker/dockerControl";

// env variables
dotenv.config();

const app = express();
const port = 8000;

// session
app.use(
	session({
		secret: process.env.SECRET!,
		resave: false,
		saveUninitialized: true,
		store: getSessionStore(),
	})
);
app.use(express.json());

app.use((req, res, next) => {
	console.log(`request: ${JSON.stringify(req.body)}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/login", (req: Request<{}, {}, UserRequest>, res: Response) => {
	login(req)
		.then((result) => {
			console.log(result);
			if (result) {
				// user found
				// TODO return success info?
			} else {
				// user not found
				// TODO return error info?
			}
		})
		.catch((error) => console.log(error));
	res.send("logging in");
});

app.get("/register", (req: Request<{}, {}, UserRequest>, res: Response) => {
	register(req)
		.then((result) => {
			if (result) {
				// user created
				// TODO return success info?
			} else {
				// user not created
				// TODO return error info?
			}
		})
		.catch((error) => console.log(error));
	res.send("registering");
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
