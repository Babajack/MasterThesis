import mongoose from "mongoose";
import { CodeFiles } from "types";

export interface SandboxSchema {
	defaultFiles: CodeFiles;
}

const sandboxSchema = new mongoose.Schema<SandboxSchema>({
	defaultFiles: {
		type: [
			{
				filename: {
					type: String,
					required: true,
				},
				code: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
});

export const Sandbox = mongoose.model("Sandbox", sandboxSchema);

export const populateDatabase = async (sandbox: SandboxSchema) => {
	await createNewSandbox(sandbox);
};

export const createNewSandbox = async (sandbox: SandboxSchema) => {
	await Sandbox.findOneAndUpdate({}, sandbox, {
		upsert: true,
		runValidators: true,
	});
};

export const getDefaultSandbox = async () => {
	return await Sandbox.findOne({});
};

export const getSandbox = async (sandboxId: string) => {
	return await Sandbox.findById(sandboxId);
};
