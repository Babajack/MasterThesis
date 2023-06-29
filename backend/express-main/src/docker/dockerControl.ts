import { Docker } from "node-docker-api";
import axios from "axios";
import { Container } from "node-docker-api/lib/container";
import fs from "fs";
import { SandboxFiles } from "types";
import { DOCKER_PORT, getNextPortNumber } from "./portControl";

const SOCKET_PATH = "/var/run/docker.sock";
//const TESTENV_IMAGE_NAME = "node-docker";
const SANDBOX_IMAGE_NAME = "express-session";

const TIMEOUT = 5000; //3600000; // milliseconds

/**
 * Timeout
 */

const startTimer = () => {
	return setTimeout(() => {
		throw new Error("Timeout!");
	}, TIMEOUT);
};

const stopTimer = (timeout: NodeJS.Timeout) => {
	clearTimeout(timeout);
};

/* -------------------------------- Docker -------------------------------- */

const docker = new Docker({
	socketPath: SOCKET_PATH,
});

export const initDockerControl = async () => {
	//await cleanup();
	/* await startContainer();
	await startContainer(); */
};

export const listContainers = async () => {
	return await docker.container.list();
};

export const cleanupContainer = async (container: Container) => {
	return container.delete({ force: true });
};

/* -------------------------------- Test Env Docker -------------------------------- */

export const runCode = async (files: SandboxFiles, userID: string) => {
	console.log("runCode");

	try {
		let newContainer = await docker.container.create({
			Image: SANDBOX_IMAGE_NAME,
			/* name: userID,
			ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				Binds: ["master-thesis_user-code:/usr/user-code"],
				NetworkMode: "master-thesis_main-network",
				PortBindings: {
					[DOCKER_PORT]: [{ HostPort: String(getNextPortNumber()) }],
				},
			}, */
		});
		// start container
		newContainer = await newContainer.start();

		for (let file of files) {
			console.log("writing to file...");

			//fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
			let exec = await newContainer.exec.create({
				Cmd: ["touch", "usr/src/app/sandbox/src/filename.js"],
				Cmd: ["cd", "usr/src/app/sandbox/src", "touch", "filename.js"],
			});
			/* exec = await exec.create({
				Cmd: ["touch", "filename.js"],
			}); */
			await exec.start();
		}

		/* let exec = await newContainer.exec
			.create({
				AttachStdout: true,
				AttachStderr: true,
				//Cmd: ["ln -s /usr/user-code/" + userID + " /usr/src/app/test"],
				//Cmd: ["ln", "-s", `/usr/user-code/${userID}`, "/usr/src/app/src"],
				Cmd: []
			})
		await exec.start() */

		/* .then((exec) => {
			return exec.start({ Detach: false });
		})
		.catch((err) => console.log(err)); */
	} catch (error) {
		console.log(error);
	}
};

/* export const startTestEnvContainer = async () => {
	return docker.container
		.create({
			Image: TESTENV_IMAGE_NAME,
			ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				PortBindings: {
					[DOCKER_PORT]: [{ HostPort: String(getNextPortNumber()) }],
				},
			},
		})
		.then((container) => container.start());
};

export const runTest = async () => {
	let container;
	try {
		// start new container
		container = await startTestEnvContainer();

		// get port number
		const status = await container.status();

		// @ts-ignore
		const currentPort = status.data.HostConfig.PortBindings[DOCKER_PORT][0].HostPort;

		// make request
		//const url = HOST_URL + ":" + currentPort;

		//const response = await axios.get(url);
		//console.log(response);
	} catch (error) {
		console.error(error);
	}

	try {
		if (container) await cleanupContainer(container);
	} catch (error) {
		console.log(error);
	}
}; */

/* -------------------------------- React Sandbox Docker -------------------------------- */

export const updateSandboxCode = (files: SandboxFiles, userID: string) => {
	const dir = "/home/node/user-code/" + userID;
	try {
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
		for (let file of files) {
			fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
		}
	} catch (error) {
		console.log(error);
	}
};

export const startSandboxContainer = async (userID: string) => {
	try {
		const container = (
			await docker.container.list({ limit: 1, filters: { name: [`${userID}`] } })
		).at(0);
		//console.log(container);

		if (container) {
			//console.log(container.data);
			// @ts-ignore
			if (container.data.State === "running") {
				//TODO: check if this means that container is healthy
				// container is already up
				return true;
			} else {
				// container is not up, but exists
				await cleanupContainer(container);
			}
		}
		// create container
		let newContainer = await docker.container.create({
			Image: SANDBOX_IMAGE_NAME,
			name: userID,
			ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				Binds: ["master-thesis_user-code:/usr/user-code"],
				NetworkMode: "master-thesis_main-network",
				PortBindings: {
					[DOCKER_PORT]: [{ HostPort: String(getNextPortNumber()) }],
				},
			},
		});
		// start container
		newContainer = await newContainer.start();

		// execute symlink command to map usercode path to src path
		newContainer.exec
			.create({
				AttachStdout: true,
				AttachStderr: true,
				//Cmd: ["ln -s /usr/user-code/" + userID + " /usr/src/app/test"],
				Cmd: ["ln", "-s", `/usr/user-code/${userID}`, "/usr/src/app/src"],
			})
			.then((exec) => {
				return exec.start({ Detach: false });
			})
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(error);
		return false;
	}

	return true;
};

export const stopSandboxContainer = async (userID: string) => {
	try {
		const container = (
			await docker.container.list({ limit: 1, filters: { name: [`${userID}`] } })
		).at(0);

		if (container) {
			await cleanupContainer(container);
		}
	} catch (error) {
		console.log(error);
		return false;
	}

	return true;
};
