import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { getSessionStore } from "./database/database";
import { authRouter, requireLogin } from "./routes/authRoutes";
import { dockerRouter } from "./routes/dockerRoutes";
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

// json parser
app.use(express.json());

// logging
app.use((req, res, next) => {
	console.log(`request: ${JSON.stringify(req.body)}`);
	next();
});

app.use("/", authRouter);

//app.use("/", requireLogin, dockerRouter);
app.use("/", dockerRouter);

app.use("/", requireLogin, taskRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	//initDockerControl();
});
