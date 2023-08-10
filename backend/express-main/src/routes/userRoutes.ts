import express from "express";
import { getUserData, updateUserCode } from "../database/user";
import { startSandboxContainer } from "../docker/dockerControl";

export const userRouter = express.Router();

userRouter.post("/user/updateUserCode", async (req, res) => {
	try {
		const type = req.query.type as string;
		const taskId = req.query.taskId as string;

		console.log("TaskID = ", taskId);

		await updateUserCode(req.session.userId!, taskId ?? "", req.body, type);

		res.send("true");
	} catch (error) {
		console.log(error);
		res.send("false");
	}
});
