import { startSandboxContainer, stopSandboxContainer } from "../docker/dockerControl";
import { login, logout, register } from "../database/auth";
import express, { NextFunction, Request, Response } from "express";
import { UserRequest } from "types";
import { getUserData, getUserByUsername } from "../database/user";

export const authRouter = express.Router();

interface AuthResponse {
	username?: string;
	error?: string;
}

// login
authRouter.post("/auth/login", (req: Request<{}, {}, UserRequest>, res: Response<AuthResponse>) => {
	login(req)
		.then((result) => {
			if (result) {
				// user found
				res.send({ username: req.body.username });
			} else {
				// user not found
				res.send({ error: "Dieser Nutzer wurde nicht gefunden!" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(404).send({ error: "Unbekannter Fehler!" });
		});
});

// register
authRouter.post(
	"/auth/register",
	(req: Request<{}, {}, UserRequest>, res: Response<AuthResponse>) => {
		register(req)
			.then((result) => {
				if (result) {
					// user created
					res.send({ username: req.body.username });
				} else {
					// user not created
					res.send({ error: "Dieser Benutzername existiert bereits!" });
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(404).send({ error: "Unbekannter Fehler!" });
			});
	}
);

// logout
authRouter.post("/auth/logout", (req: Request<{}, {}, UserRequest>, res: Response) => {
	logout(req)
		.then((result) => {
			if (result) {
				// user logged out
				// TODO return success info?
			} else {
				// user not logged out
				// TODO return error info?
			}
		})
		.catch((error) => console.log(error))
		.finally(() => res.send("logout"));
});

authRouter.get("/user", async (req, res) => {
	if (!req.session.userId) {
		res.send({ error: "Session does not exist!" });
	} else {
		getUserData(req.session.userId)
			.then(async (user) => {
				await startSandboxContainer(req.session.userId!);
				if (user) {
					res.send(user);
				} else {
					res.send({ error: "Session does not exist!" });
				}
			})
			.catch((error) => {
				console.log(error);

				res.send({ error: "Session does not exist!" });
			});
	}
});

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.userId) {
		next();
	} else {
		res.status(401).send("Unauthorized");
	}
};

//module.exports = authRouter;
