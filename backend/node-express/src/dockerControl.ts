import { Docker } from "node-docker-api";
import axios from "axios";
import { Container } from "node-docker-api/lib/container";

//const SOCKET_PATH = "//./pipe/docker_engine";
const SOCKET_PATH = "'/var/run/docker.sock'";
const IMAGE_NAME = "node-docker";
const DOCKER_PORT = "8000/tcp";
const HOST_URL = "http://localhost";

const HOST_PORT_DEFAULT = 4000;

/**
 * Port
 */
var hostPort: number = HOST_PORT_DEFAULT;

const getNextPortNumber = () => {
	if (hostPort === HOST_PORT_DEFAULT + 1000) {
		resetPortNumber();
		return hostPort;
	} else {
		return hostPort++;
	}
};

const resetPortNumber = () => {
	hostPort = HOST_PORT_DEFAULT;
};

/**
 * Docker
 */
const docker = new Docker({
	socketPath: SOCKET_PATH,
});

export const initDockerControl = async () => {
	await cleanup();
	/* await startContainer();
	await startContainer(); */
};

export const listContainers = async () => {
	return await docker.container.list();
};

export const cleanup = async () => {
	for (let container of await docker.container.list()) {
		container.delete({ force: true });
	}
	resetPortNumber();
};

export const startContainer = async () => {
	return docker.container
		.create({
			Image: IMAGE_NAME,
			ExposedPorts: { [DOCKER_PORT]: {} },
			HostConfig: {
				PortBindings: {
					[DOCKER_PORT]: [{ HostPort: String(getNextPortNumber()) }],
				},
			},
		})
		.then((container) => container.start());
};

export const executeTask = async () => {
	// start new container
	const container = await startContainer();
	try {
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
	//await container.delete({ force: true });
};
