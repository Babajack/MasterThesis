import { Docker } from "node-docker-api";
import axios from "axios";
import { Container } from "node-docker-api/lib/container";
import fs from "fs";
import { CodeFiles } from "types";
import path from "path";
import { MAX_AGE } from "../index";

const SOCKET_PATH = "/var/run/docker.sock";
const SANDBOX_IMAGE_NAME =
	process.env.DEV_MODE === "false"
		? "babajack/master_thesis:express-session-latest"
		: "express-session-latest";

/* -------------------------------- Docker -------------------------------- */

const docker = new Docker({
	socketPath: SOCKET_PATH,
});

export const listContainers = async () => {
	return await docker.container.list();
};

export const cleanupContainer = async (container: Container) => {
	return container.delete({ force: true });
};

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
				// Binds: [
				// 	"C:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/backend/express-session/src:/usr/src/app/src",
				// 	"C:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/backend/express-session/task/tests:/usr/src/app/task/tests",
				// ],
				NetworkMode: "master-thesis_main-network",
				CpuPeriod: 100000,
				CpuQuota: 50000,
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
