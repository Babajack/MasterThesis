import { Request } from "express";
import { getUser } from "./user";
import { UserRequest } from "types";

/**
 * attempt to login user & save user data to session
 * @param req
 * @returns true if success, false if not
 */
export const login = async (req: Request<{}, {}, UserRequest>) => {
	let result;
	const user = await getUser(req.body.username, req.body.passwort);
	if (user) {
		req.session.user = { username: user.username, passwort: user.passwort, id: user.id };
		req.session.save((err) => {
			if (err) {
				console.log(err);
			}
		});
		return true;
	} else {
		return false;
	}
};

export const register = async (username: string, passwort: string) => {
	const user = await getUser(username, passwort);
	console.log(user);
};
