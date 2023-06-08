import { Request } from "express";
import { createNewUser, getUser } from "./user";
import { UserRequest } from "types";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * attempt to login user & save user data to session
 * @param req
 * @returns true if success, false if not
 */
export const login = async (req: Request<{}, {}, UserRequest>) => {
	const user = await getUser(req.body.username);
	if (user) {
		if (await bcrypt.compare(req.body.passwort, user.passwort)) {
			req.session.user = { username: user.username, id: user.id };
			return new Promise((resolve, reject) => {
				req.session.save((err) => {
					if (err) reject(err);
					else resolve(true);
				});
			});
		}
	}
	return false;
};

/**
 * attempt to register user & login after
 * @param req
 * @returns true if success, false if not
 */
export const register = async (req: Request<{}, {}, UserRequest>) => {
	const passwort = await hashPasswort(req.body.passwort);

	const user = await createNewUser(req.body.username, passwort);
	console.log(user);
	return true;
};

/**
 * attempt to logout a user
 * @param req
 * @returns true if success, false if not
 */
export const logout = async (req: Request) => {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);
			else resolve(true);
		});
	});
};

const hashPasswort = async (password: string) => {
	return bcrypt.hash(password, SALT_ROUNDS);
};
