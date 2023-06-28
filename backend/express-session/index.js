const path = require("path");
const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
//import * as esbuild from "esbuild";
const esbuild = require("esbuild");

const app = express(); // create express app

/* app.use((req, res, next) => {
	console.log("test");
	 exec(
		"npm run build",
		{
			cwd: "../",
		},
		(err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				console.log(err);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			next();
		}
	); 
	next();
}); */

//app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("./sandbox/public"));

app.get("*", (req, res) => {
	//res.send("This is from express.js");
	res.sendFile(path.join(__dirname, "sandbox/public/index.html"));
});

/* app.get("/update", (req, res) => {
	console.log("building app...");
	update().then((e) => {
		res.send("This is from express.js");
	});
}); */

// start express server on port 5000
app.listen(5000, () => {
	console.log("server started on port 5000");

	esbuild
		.context({
			entryPoints: ["./sandbox/src/index.js"],
			bundle: true,
			minify: true,
			sourcemap: true,
			//target: ["chrome58", "firefox57", "safari11", "edge16"],
			outfile: "./sandbox/public/build/App.js",
			loader: { ".js": "jsx" },
		})
		.then((e) => e.watch())
		.catch((error) => console.log(error));
});

/* let build = async () =>
	esbuild.build({
		entryPoints: ["../src/index.js"],
		bundle: true,
		minify: true,
		sourcemap: true,
		//target: ["chrome58", "firefox57", "safari11", "edge16"],
		outfile: "../public/build/App.js",
		loader: { ".js": "jsx" },
	});

async function update() {
	 const { stdout, stderr } = await exec("npm run build", {
		cwd: "../",
	});
	console.log("stdout:", stdout);
	console.log("stderr:", stderr); 
	return build();
} */
