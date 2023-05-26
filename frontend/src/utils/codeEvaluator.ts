export function evaluateCode(code: any) {
	try {
		const evaluatedCode = eval(code);
		return evaluatedCode;
	} catch (error) {
		console.log(error);
		// Handle error, e.g., display an error message
	}
}
