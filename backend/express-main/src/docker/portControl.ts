// configuration
export const DOCKER_PORT = "8000/tcp";
const HOST_PORT_DEFAULT = 10000;
const HOST_PORT_MAX = 20000;

/**
 * Port
 */
var hostPort: number = HOST_PORT_DEFAULT;

export const getNextPortNumber = () => {
	if (hostPort === HOST_PORT_DEFAULT + HOST_PORT_MAX) {
		resetPortNumber();
		return hostPort;
	} else {
		return hostPort++;
	}
};

export const resetPortNumber = () => {
	hostPort = HOST_PORT_DEFAULT;
};
