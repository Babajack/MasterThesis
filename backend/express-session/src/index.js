const path = require("path");
const express = require("express");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
//import * as esbuild from "esbuild";
const esbuild = require("esbuild");
const { ESLint } = require("eslint");

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
		const errors = await lint();
		if (errors && errors !== "no problems") {
			// send errors
			res.send({ error: errors });
		} else {
			await build();
			res.send(true);
		}
	} catch (error) {
		console.log(error);
		res.send({ error: error });
	}
});

app.listen(8000, () => {
	console.log("server started on port 8001");
});

const build = async () => {
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

const lint = async () => {
	const eslint = new ESLint({
		overrideConfig: {
			env: {
				browser: true,
				es6: true,
			},
			extends: ["eslint:recommended", "plugin:react/recommended"],
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: {
					jsx: true,
				},
				sourceType: "module",
			},
			plugins: ["react"],
			settings: {
				react: {
					version: "detect",
				},
			},
			rules: {
				"react/jsx-uses-react": "error",
				"react/jsx-uses-vars": "error",
				"no-unused-expressions": "off",
				"no-unused-vars": "off",
			},
		},
	});
	// return await eslint.lintFiles(["/usr/src/app/sandbox/src/*.js"]);
	const results = await eslint.lintFiles(["/usr/src/app/sandbox/src/*.js"]);
	const formatter = await eslint.loadFormatter("visualstudio");
	const resultText = formatter.format(results);
	return resultText.replaceAll("/usr/src/app/sandbox/src/", "");
};

const updateSandboxCode = (files) => {
	const dir = "/usr/src/app/sandbox/src";
	//console.log(files);
	//try {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	for (let file of files) {
		fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
	}
	/* } catch (error) {
		console.log(error);
	} */
};
