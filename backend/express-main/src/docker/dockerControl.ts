import { Docker } from "node-docker-api";
import axios from "axios";
import { Container } from "node-docker-api/lib/container";
import fs from "fs";
import { SandboxFiles } from "types";
import { DOCKER_PORT, getNextPortNumber } from "./portControl";

const SOCKET_PATH = "/var/run/docker.sock";
const TESTENV_IMAGE_NAME = "node-docker";
const SANDBOX_IMAGE_NAME = "react-sandbox";

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

export const startTestEnvContainer = async () => {
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
};

/* -------------------------------- React Sandbox Docker -------------------------------- */

export const updateSandboxCode = (files: SandboxFiles) => {
	try {
		for (let file of files) {
			fs.writeFileSync("/home/node/user-code/" + file.filename, file.code);
		}
	} catch (error) {
		console.log(error);
	}
};

export const startSandboxContainer = async () => {
	return docker.container
		.create({
			Image: SANDBOX_IMAGE_NAME,
			ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				Binds: ["master-thesis_user-code:/usr/src/app/user-code"],
				NetworkMode: "master-thesis_main-network",
				PortBindings: {
					[DOCKER_PORT]: [{ HostPort: String(getNextPortNumber()) }],
				},
			},
		})
		.then((container) => container.start());
};
