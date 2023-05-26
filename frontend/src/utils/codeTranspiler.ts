import { transformSync } from "@babel/core";
const babel = require("@babel/core");

export function transpileCode(code: string) {
	const transpiledCode = babel.transformSync(code, {
		presets: ["@babel/preset-react"],
		plugins: ["@babel/plugin-transform-class-properties"],
	});
	if (transpiledCode) return transpiledCode.code;
	else return "";
}
