// configuration
export const DOCKER_PORT = "8000/tcp";
const HOST_PORT_DEFAULT = 4000;

/**
 * Port
 */
var hostPort: number = HOST_PORT_DEFAULT;

export const getNextPortNumber = () => {
	if (hostPort === HOST_PORT_DEFAULT + 1000) {
		resetPortNumber();
		return hostPort;
	} else {
		return hostPort++;
	}
};

export const resetPortNumber = () => {
	hostPort = HOST_PORT_DEFAULT;
};
