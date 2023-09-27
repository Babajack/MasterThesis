const path = require("path");
const express = require("express");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
//import * as esbuild from "esbuild";
const esbuild = require("esbuild");
const { ESLint } = require("eslint");
const jest = require("jest");

const app = express(); // create express app

// json parser
app.use(express.json());

//app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/sandbox", express.static("./sandbox/public"));
app.use("/task", express.static("./task/public"));

app.get("/", (req, res) => {
	//res.send("This is from express.js");
	const newPath = req.query.type;
	res.sendFile(path.join(__dirname, "..", newPath, "/src/index.html"));
});

// app.post("/build", (req, res) => {
// 	build()
// 		.then((result) => res.sendFile(path.join(__dirname, "..", "sandbox/src/index.html")))
// 		.catch((error) => console.log(error));
// });

app.post("/runCode", async (req, res) => {
	const path = req.query.type;
	try {
		// 1. update code files
		updateCodeFiles(req.body, path);

		// 2. lint code
		let lintErrors = await lint(path);
		// if (lintErrors && lintErrors.length > 0) {
		// 	// send lintErrors
		// 	res.send({ error: lintErrors });
		// 	return;
		// }

		// 3.build code
		let buildErrors = await build(path);
		// if (buildErrors && buildErrors.length > 0) {
		// 	// send buildErrors
		// 	res.send({ error: buildErrors });
		// 	return;
		// }

		// 4. merge error lists
		if (lintErrors.length > 0 || buildErrors.length > 0) {
			let mergedErrors = [...lintErrors];
			for (let buildError of buildErrors) {
				const index = mergedErrors.findIndex(
					(lintError) => lintError.filename === buildError.filename
				);
				if (index !== -1) {
					mergedErrors[index].errors.concat(buildError.errors);
				} else {
					mergedErrors.push({ filename: buildError.filename, errors: buildError.errors });
				}
			}
			res.send({ error: mergedErrors });
			return;
		}

		res.send(true);
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: error });
	}
});

app.post("/runTest", async (req, res) => {
	const path = req.query.path;

	var testResults;

	try {
		// 1. update code files
		updateCodeFiles(req.body, "task");

		// 2. lint code
		let lintErrors = await lint("task");

		// 3.build code
		let buildErrors = await build("task");

		// 4. merge error lists
		if (lintErrors.length > 0 || buildErrors.length > 0) {
			let mergedErrors = [...lintErrors];
			for (let buildError of buildErrors) {
				const index = mergedErrors.findIndex(
					(lintError) => lintError.filename === buildError.filename
				);
				if (index !== -1) {
					mergedErrors[index].errors.concat(buildError.errors);
				} else {
					mergedErrors.push({ filename: buildError.filename, errors: buildError.errors });
				}
			}

			res.send({ error: mergedErrors });
			return;
		}
		// 5. run tests
		// const testResult = await jest.runCLI(
		// 	{
		// 		rootDir: "./task/tests/",
		// 		testMatch: [`**/${path}.test.jss`],
		// 	},
		// 	["./task/tests"]
		// );
		// console.log(testResult);

		// const { results } = await jest.runCLI(
		// 	{
		// 		rootDir: "./task/tests/",
		// 		testMatch: [`**/${path}.test.js`],
		// 		silent: true,
		// 		passWithNoTests: true,
		// 		transform: "babel-jest",
		// 	},
		// 	["./task/tests"]
		// );
		const results = await exec(`env NODE_ENV=test jest --json --testRegex="task/tests/${path}"`);
		testResults = JSON.parse(results.stdout);
	} catch (error) {
		//console.log(error);
		if (error.stdout) {
			testResults = JSON.parse(error.stdout);
			// if there are no tests executed, return error
			if (!testResults.success && testResults.testResults[0].assertionResults.length === 0) {
				//res.send({ error: testResults.testResults[0].message }); dont send actual message
				res.send({
					error: "There is an Error in the test execution. Check missing files and exports.",
				});
				return;
			}
		} else {
			res.status(500).send({ error: error });
			return;
		}
	}

	let parsedResults = testResults.testResults[0].assertionResults.map((elem) => {
		return {
			title: elem.title,
			status: elem.status,
		};
	});
	//const isPassed = !testResults.some((elem) => elem.status !== "passed");
	const isPassed = testResults.success;

	const response = { passed: isPassed, testResults: parsedResults, files: req.body };
	res.send(response);
});

app.listen(8000, () => {
	console.log("server started on port 8000");
});

/**
 * build the code
 * @returns
 */
const build = async (path) => {
	try {
		await esbuild.build({
			entryPoints: [`./${path}/src/index.js`],
			bundle: true,
			minify: true,
			//sourcemap: true,
			//target: ["chrome58", "firefox57", "safari11", "edge16"],
			outfile: `./${path}/public/build/App.js`,
			//outdir: `./${path}/public/build/`,
			loader: { ".js": "jsx" },
		});
		return [];
	} catch (results) {
		let errors = results.errors
			.map((error) => {
				return {
					filename: error.location.file.replace(`${path}/src/`, ""),
					error: { message: error.text, line: error.location.line },
				};
			})
			.reduce((prev, cur) => {
				const index = prev.findIndex((elem) => elem.filename === cur.filename);
				if (index !== -1) {
					prev[index].errors.push(cur.error);
				} else {
					prev.push({ filename: cur.filename, errors: [cur.error] });
				}
				return prev;
			}, []);
		return errors;
	}
	/* .then((result) => true)
	.catch((error) => error); */
};

/**
 * lint the code
 * @returns errors found
 */
const lint = async (path) => {
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
	let results = await eslint.lintFiles([`/usr/src/app/${path}/src/*.js`]);
	//const formatter = await eslint.loadFormatter("visualstudio");
	const formatter = await eslint.loadFormatter("json");
	results = formatter.format(results);

	//console.log(resultText);
	//results = results.replaceAll("/usr/src/app/${path}/src/", "");

	// parse results
	results = JSON.parse(results);
	results = results
		.filter((result) => result.messages.length > 0)
		.map((result) => {
			let errors = result.messages.map((error) => {
				return {
					message: error.message,
					line: error.line,
				};
			});
			return {
				filename: result.filePath.replace(`/usr/src/app/${path}/src/`, ""),
				errors: errors,
			};
		});
	return results;
	// let errors = []
	// for (let result of results) {
	// 	for (let message of result.messages) {

	// 	}
	// }
};

/**
 * update the user code
 * write files to file system
 * @param {*} files
 */
const updateCodeFiles = (files, path) => {
	const dir = `/usr/src/app/${path}/src/`;

	// delete files if exists
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { recursive: true, force: true });
	}
	// then write files
	fs.mkdirSync(dir);
	for (let file of files) {
		fs.writeFileSync(dir + "/" + JSON.stringify(file.filename).slice(1, -1), file.code);
	}
};
