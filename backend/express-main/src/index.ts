import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getSessionStore } from "./database/database";
import { startSandboxContainer } from "./docker/dockerControl";
import { authRouter, requireLogin } from "./routes/authRoutes";
import { sandboxRouter } from "./routes/sandboxRoutes";
import { taskRouter } from "./routes/taskRoutes";
import { getTaskById, getTasksByUnlocksList } from "./database/task";
import { sessionDockerRouter } from "./routes/sessionDockerRoutes";
import { unlockTasksFromTask } from "./database/user";

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

// init session container configs
app.use("/sessionContainer", requireLogin, sessionDockerRouter);

// proxy
app.use(
	"/sessionContainer",
	requireLogin,
	createProxyMiddleware({
		router: (req) => "http://" + req.session.userId + ":8000",
		//router: (req) => "http://master-thesis-backend-express-session-1:8000",
		/* router: (req) => {
			//console.log(req);

			return "http://master-thesis-backend-express-session-1:8000";
		}, */
		changeOrigin: true,
		pathRewrite: {
			"^/sessionContainer": "", // Replace '/api' with the base path of the server you want to proxy to
		},

		onError: (error, req, res, target) => {
			console.log(error);
			if (req.session.userId)
				startSandboxContainer(req.session.userId).finally(() =>
					res.status(202).send({ message: "Container is starting..." })
				);
		},
		onProxyReq: (proxyReq, req, res, options) => {
			// reset search params (bug?)
			const baseUrl = `${proxyReq.protocol}//${proxyReq.host}`;
			const url = new URL(proxyReq.path, baseUrl);
			url.search = "";
			for (const [key, value] of Object.entries(req.query)) {
				url.searchParams.append(key, value?.toString() ?? "");
			}
			proxyReq.path = url.pathname + url.search;
		},
		onProxyRes: (proxyRes, req, res) => {
			if (req.path === "/runTest") {
				let body = Buffer.from([]);

				proxyRes.on("data", (chunk) => {
					body = Buffer.concat([body, chunk]);
				});

				proxyRes.on("end", () => {
					const responseBody = body.toString("utf8");
					const responseJSON = JSON.parse(responseBody);

					if (responseJSON.passed) {
						unlockTasksFromTask(req.session.userId!, req.query.taskId as string);
					}
				});
			}
		},
	})
);

// json parser
app.use(express.json());

// logging
app.use((req, res, next) => {
	console.log("Incoming Request", req.method, req.url, req.body);
	next();
});

app.use("/", authRouter);

//app.use("/", requireLogin, sessionDockerRouter);
//app.use("/", sessionDockerRouter);

app.use("/", requireLogin, taskRouter);
app.use("/", requireLogin, sandboxRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	//initDockerControl();
});
