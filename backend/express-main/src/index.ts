import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import { getSessionStore } from "./database/database";
import { authRouter, requireLogin } from "./routes/authRoutes";
import { sessionDockerRouter } from "./routes/sessionDockerRoutes";
import { taskRouter } from "./routes/taskRoutes";
import { runCode } from "./docker/dockerControl";
import { SandboxFiles } from "types";
import { createProxyMiddleware } from "http-proxy-middleware";

// env variables
dotenv.config();

const app = express();
const port = 8000;
const MAX_AGE = 1000 * 60 * 60 * 6;

// cors
app.use(
	cors({
		//origin: [process.env.FRONTEND_SERVER!],
		origin: ["http://localhost:3000", "http://localhost:3001"],
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

// proxy
app.use(
	"/sessionContainer",
	createProxyMiddleware({
		router: (req) => "http://" + req.session.user?.id + ":8000",
		//router: (req) => "http://master-thesis-backend-express-session-1:8000",
		/* router: (req) => {
			//console.log(req);

			return "http://master-thesis-backend-express-session-1:8000";
		}, */
		changeOrigin: true,
		pathRewrite: {
			"^/sessionContainer": "", // Replace '/api' with the base path of the server you want to proxy to
		},
		/* onProxyReq: (proxyReq, req, res, options) => {
				if (req.body) {
					const data = JSON.stringify(req.body);
					proxyReq.setHeader("Content-Type", "application/json");
					proxyReq.setHeader("Content-Length", Buffer.byteLength(data));
					// stream the content
					proxyReq.write(data);
				}
			}, */
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

//app.use("/", requireLogin, sessionDockerRouter);
//app.use("/", sessionDockerRouter);

app.use("/", requireLogin, taskRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	//initDockerControl();
});
