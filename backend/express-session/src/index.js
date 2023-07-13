const path = require("path");
const express = require("express");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
//import * as esbuild from "esbuild";
const esbuild = require("esbuild");

const app = express(); // create express app

// json parser
app.use(express.json());

//app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("./sandbox/public"));

app.get("/", (req, res) => {
	//res.send("This is from express.js");
	res.sendFile(path.join(__dirname, "..", "sandbox/src/index.html"));
});

app.post("/build", (req, res) => {
	build()
		.then((result) => res.sendFile(path.join(__dirname, "..", "sandbox/src/index.html")))
		.catch((error) => console.log(error));
});

app.post("/updateCode", async (req, res) => {
	//console.log(req.body);
	try {
		updateSandboxCode(req.body);
		await build();
		res.send(true);
	} catch (error) {
		res.send(error);
	}
});

app.listen(8000, () => {
	console.log("server started on port 8001");
});

let build = async () => {
	return esbuild.build({
		entryPoints: ["./sandbox/src/index.js"],
		bundle: true,
		minify: true,
		//sourcemap: true,
		//target: ["chrome58", "firefox57", "safari11", "edge16"],
		outfile: "./sandbox/public/build/App.js",
		loader: { ".js": "jsx" },
	});
	/* .then((result) => true)
	.catch((error) => error); */
};

const updateSandboxCode = (files) => {
	const dir = "/usr/src/app/sandbox/src";
	//console.log(files);
	try {
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
		for (let file of files) {
			fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
		}
	} catch (error) {
		console.log(error);
	}
};
