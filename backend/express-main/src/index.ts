import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import { UserRequest } from "types";
import { login, register } from "./database/auth";
import { getSessionStore } from "./database/database";
import { startSandboxContainer, updateSandboxCode } from "./docker/dockerControl";
import { authRouter } from "./routes/auth";
import cors from "cors";

// env variables
dotenv.config();

const app = express();
const port = 8000;
const MAX_AGE = 1000 * 60 * 60;

// cors
app.use(
	cors({
		//origin: [process.env.FRONTEND_SERVER!],
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// session
app.use(
	session({
		secret: process.env.SECRET!,
		resave: true,
		saveUninitialized: false,
		store: getSessionStore(),
		cookie: {
			maxAge: MAX_AGE,
		},
	})
);

// json parser
app.use(express.json());

// logging
app.use((req, res, next) => {
	console.log(`request: ${JSON.stringify(req.body)}`);
	next();
});

app.use("/", authRouter);

app.get("/docker", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	updateSandboxCode([{ filename: "testfile", code: "console.log('testcode')" }]);
});

app.get("/docker/start", (req, res) => {
	res.send("starting docker...");
	//executeTask();
	startSandboxContainer(req.session.user?.id!);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	//initDockerControl();
});
