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
			//console.log(proxyReq.path);
			// if (req.body) {
			// 	const data = JSON.stringify(req.body);
			// 	proxyReq.setHeader("Content-Type", "application/json");
			// 	proxyReq.setHeader("Content-Length", Buffer.byteLength(data));
			// 	// stream the content
			// 	proxyReq.write(data);
			// }
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
