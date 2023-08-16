import { Docker } from "node-docker-api";
import axios from "axios";
import { Container } from "node-docker-api/lib/container";
import fs from "fs";
import { CodeFiles } from "types";
import path from "path";
import { MAX_AGE } from "../index";
//import { DOCKER_PORT, getNextPortNumber } from "./portControl";

const SOCKET_PATH = "/var/run/docker.sock";
//const TESTENV_IMAGE_NAME = "node-docker";
const SANDBOX_IMAGE_NAME = "express-session";
const DOCKER_PORT = 8000;
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

/* export const runCode = async (files: SandboxFiles, userID: string) => {
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
			}, 
		});
		// start container
		newContainer = await newContainer.start();

		for (let file of files) {
			console.log("writing to file...");

			//fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
			let exec = await newContainer.exec.create({
				Cmd: ["touch", "usr/src/app/sandbox/src/filename.js"],
			});
			 exec = await exec.create({
				Cmd: ["touch", "filename.js"],
			}); 
			await exec.start();
		}

		 let exec = await newContainer.exec
			.create({
				AttachStdout: true,
				AttachStderr: true,
				//Cmd: ["ln -s /usr/user-code/" + userID + " /usr/src/app/test"],
				//Cmd: ["ln", "-s", `/usr/user-code/${userID}`, "/usr/src/app/src"],
				Cmd: []
			})
		await exec.start() 

		 .then((exec) => {
			return exec.start({ Detach: false });
		})
		.catch((err) => console.log(err)); 
	} catch (error) {
		console.log(error);
	}
}; */

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

// export const runCode = async (files: CodeFiles, userID: string) => {
// 	//updateSandboxCode(files, userID);
// 	const container = await startSandboxContainer(userID);
// 	if (container) {
// 		//const port = (container.data as any).Ports[1].PublicPort;
// 		const url = "http://" + userID + ":" + DOCKER_PORT + "/test";
// 		return await axios
// 			.get(url)
// 			.then((result) => result)
// 			.catch((error) => error);
// 	}
// };

// export const updateSandboxCode = (files: CodeFiles, userID: string) => {
// 	const dir = "/home/node/user-code/" + userID;
// 	try {
// 		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// 		for (let file of files) {
// 			fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const startSandboxContainer = async (userID: string) => {
	if (!userID) return;
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
				return container;
			} else {
				// container is not up, but exists
				await cleanupContainer(container);
			}
		}
		// create container
		//const hostPort = String(getNextPortNumber());
		let newContainer = await docker.container.create({
			Image: SANDBOX_IMAGE_NAME,
			name: userID,

			//ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				//Binds: ["master-thesis_user-code:/usr/user-code"],
				Binds: [
					"C:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/backend/express-session/src:/usr/src/app/src",
					"C:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/backend/express-session/task/tests:/usr/src/app/task/tests",
				],
				NetworkMode: "master-thesis_main-network",
				PortBindings: {
					//[DOCKER_PORT]: [{ HostPort: hostPort }],
				},
			},
		});
		// start container
		newContainer = await newContainer.start();

		setTimeout(async () => {
			console.log("Stopping container:", newContainer.id);
			await newContainer.stop();
			await newContainer.delete({ force: true }); // Remove the container forcibly
			console.log("Container removed:", newContainer.id);
		}, MAX_AGE);

		// execute symlink command to map usercode path to src path
		/* newContainer.exec
			.create({
				AttachStdout: true,
				AttachStderr: true,
				//Cmd: ["ln -s /usr/user-code/" + userID + " /usr/src/app/test"],
				Cmd: ["ln", "-s", `/usr/user-code/${userID}`, "/usr/src/app/src"],
			})
			.then((exec) => {
				return exec.start({ Detach: false });
			})
			.catch((err) => console.log(err)); */
		return newContainer;
	} catch (error) {
		console.log(error);
		return undefined;
	}
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
