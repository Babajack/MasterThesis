import { runCode, startSandboxContainer, updateSandboxCode } from "../docker/dockerControl";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const sessionDockerRouter = express.Router();

/* sessionDockerRouter.use(
	"/sessionContainer",
	createProxyMiddleware({
		//router: (req) => "http://" + req.session.user?.id + ":8000",
		//router: (req) => "http://master-thesis-backend-express-session-1:8000",
		router: (req) => {
			//console.log(req);

			return "http://master-thesis-backend-express-session-1:8000";
		},
		//router: (req) => "http://7f280f9f-20e8-4b78-a4a8-edce6b7443c6:8000",
		//target: "", // Replace with the URL of the server you want to proxy to
		changeOrigin: true,
		pathRewrite: {
			"^/sessionContainer": "", // Replace '/api' with the base path of the server you want to proxy to
		},
		onProxyReq: (proxyReq, req, res, options) => {
			if (req.body) {
				const data = JSON.stringify(req.body);
				proxyReq.setHeader("Content-Type", "application/json");
				proxyReq.setHeader("Content-Length", Buffer.byteLength(data));
				// stream the content
				proxyReq.write(data);
			}
		},
	})
); */
/* sessionDockerRouter.use("/static", (req, res, next) => {
	createProxyMiddleware({
		target: "http://" + req.session.user?.id + ":8000", // Replace with the URL of the server you want to proxy to
		changeOrigin: true,
		pathRewrite: {
			"^/static": "", // Replace '/api' with the base path of the server you want to proxy to
		},
	})(req, res, next);
}); */
