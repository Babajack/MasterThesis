import { login, logout, register } from "../database/auth";
import express, { NextFunction, Request, Response } from "express";
import { UserRequest } from "types";

export const authRouter = express.Router();

authRouter.use((req, res, next) => {
	console.log("Time: ", Date.now());
	next();
});

// login
authRouter.post("/auth/login", (req: Request<{}, {}, UserRequest>, res: Response) => {
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

// register
authRouter.post("/auth/register", (req: Request<{}, {}, UserRequest>, res: Response) => {
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

// logout
authRouter.post("/auth/logout", (req: Request<{}, {}, UserRequest>, res: Response) => {
	logout(req)
		.then((result) => {
			console.log(result);
			if (result) {
				// user logged out
				// TODO return success info?
			} else {
				// user not logged out
				// TODO return error info?
			}
		})
		.catch((error) => console.log(error));
	res.send("logout");
});

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect("/auth/login");
	}
};

//module.exports = authRouter;
