import { Request } from "express";
import { createNewUser, getUserByUsername } from "./user";
import { UserRequest } from "types";
import bcrypt from "bcrypt";
import { stopSandboxContainer } from "../docker/dockerControl";

const SALT_ROUNDS = 10;

/**
 * attempt to login user & save user data to session
 * @param req
 * @returns true if success, false if not
 */
export const login = async (req: Request<{}, {}, UserRequest>) => {
	const user = await getUserByUsername(req.body.username);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			req.session.userId = user.id;
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
	const password = await hashPassword(req.body.password);

	const user = await createNewUser(req.body.username, password);
	if (user) {
		req.session.userId = user.id;
		return new Promise((resolve, reject) => {
			req.session.save((err) => {
				if (err) reject(err);
				else resolve(true);
			});
		});
	}
	return false;
};

/**
 * attempt to logout a user
 * @param req
 * @returns true if success, false if not
 */
export const logout = async (req: Request) => {
	if (req.session.userId) stopSandboxContainer(req.session.userId!);
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);
			else resolve(true);
		});
	});
};

const hashPassword = async (password: string) => {
	return bcrypt.hash(password, SALT_ROUNDS);
};
