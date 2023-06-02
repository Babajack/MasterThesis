import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		index: { unique: true, dropDups: true },
	},
	username: {
		type: String,
		required: true,
		index: { unique: true, dropDups: true },
	},
	passwort: {
		type: String,
		required: true,
	},
	tasks: [
		{
			category: { type: String, required: true },
			tasks: {
				type: [
					{
						id: {
							type: Number,
							required: true,
						},
						default_code: { type: [{ filename: String, code: String }], required: true },
						user_solution: [{ filename: String, code: String }],
						user_code: [{ filename: String, code: String }],
					},
				],
				required: true,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);

export const createNewUser = async (username: string, passwort: string) => {
	return await User.create({
		id: uuidv4(),
		username: username,
		passwort: passwort,
		tasks: [],
	});
};

export const getUser = async (username: string, passwort: string) => {
	return (
		await User.find({
			username: username,
			passwort: passwort,
		})
	).at(0);
};
