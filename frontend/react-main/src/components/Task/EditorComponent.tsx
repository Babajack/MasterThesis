import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import axios from "axios";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

//import "./EditorComponent.css";

const EditorComponent: React.FC = () => {
	const taskState = useSelector((state: RootState) => state.task);

	const [selectedFile, setSelectedFile] = useState("app.js");

	const currentFile = taskState.currentFiles.find((elem) => elem.filename === selectedFile);

	/**
	 * handle auto close html tags
	 * @param monaco
	 */
	const handleBeforeMount = (
		monaco: typeof import("c:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/frontend/react-main/node_modules/monaco-editor/esm/vs/editor/editor.api")
	) => {
		monaco.languages.registerCompletionItemProvider("javascript", {
			triggerCharacters: [">"],
			provideCompletionItems: (model, position) => {
				const codePre: string = model.getValueInRange({
					startLineNumber: position.lineNumber,
					startColumn: 1,
					endLineNumber: position.lineNumber,
					endColumn: position.column,
				});

				const tag = codePre.match(/.*<(\w+)>$/)?.[1];

				if (!tag) {
					return;
				}

				const word = model.getWordUntilPosition(position);

				return {
					suggestions: [
						{
							label: `</${tag}>`,
							kind: monaco.languages.CompletionItemKind.EnumMember,
							insertText: `$1</${tag}>`,
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
							range: {
								startLineNumber: position.lineNumber,
								endLineNumber: position.lineNumber,
								startColumn: word.startColumn,
								endColumn: word.endColumn,
							},
						},
					],
				};
			},
		});

		fetch("https://cdn.jsdelivr.net/npm/@types/react@16.9.41/index.d.ts")
			.then((react_def_file) => {
				react_def_file.text().then((res) => {
					/* monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);

					monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
						noSemanticValidation: true,
						noSyntaxValidation: false,
					});

					monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
						target: monaco.languages.typescript.ScriptTarget.ES2016,
						allowNonTsExtensions: true,
						allowJs: true,
						moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
						module: monaco.languages.typescript.ModuleKind.ESNext,
					});

					// THIS IS WHAT GOT AUTO COMPLETION WORKING FOR ME
					// In my actual file, I replace the first argument with the `@types/jest` declaration file
					monaco.editor.createModel(res, "typescript", monaco.Uri.parse("./types.d.ts")); */

					monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
						target: monaco.languages.typescript.ScriptTarget.Latest,
						allowNonTsExtensions: true,
						moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
						module: monaco.languages.typescript.ModuleKind.CommonJS,
						noEmit: true,
						esModuleInterop: true,
						jsx: monaco.languages.typescript.JsxEmit.React,
						reactNamespace: "React",
						allowJs: true,
						typeRoots: ["node_modules/@types"],
					});

					monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
						noSemanticValidation: false,
						noSyntaxValidation: false,
					});

					monaco.languages.typescript.javascriptDefaults.addExtraLib(
						res,
						`file:///node_modules/@react/types/index.d.ts`
					);
				});
			})
			.catch((e) => console.log(e));
	};

	// This function is used to active the JSX syntax highlighting
	const activateMonacoJSXHighlighter = async (monacoEditor: any, monaco: any) => {
		const { default: traverse } = await import("@babel/traverse");
		const { parse } = await import("@babel/parser");
		// @ts-ignore
		const { default: MonacoJSXHighlighter } = await import("monaco-jsx-highlighter");

		const monacoJSXHighlighter = new MonacoJSXHighlighter(monaco, parse, traverse, monacoEditor);

		monacoJSXHighlighter.highlightOnDidChangeModelContent();
		monacoJSXHighlighter.addJSXCommentCommand();

		return {
			monacoJSXHighlighter,
		};
	};

	const handleEditorDidMount = React.useCallback(async (editor: any, monaco: any) => {
		activateMonacoJSXHighlighter(editor, monaco);
	}, []);

	return (
		<Editor
			className="h-100"
			options={{ minimap: { enabled: false } /* autoClosingBrackets: "always" */ }}
			//height={"100%"}
			defaultLanguage="javascript"
			//defaultLanguage="typescript"
			//language="javascript"
			theme="vs-dark"
			value={currentFile?.code ?? ""}
			beforeMount={handleBeforeMount}
			onMount={handleEditorDidMount}

			//onValidate={handleEditorValidation}
			//defaultValue="// some comment"
		/>
	);
};

export default EditorComponent;

/* axios
					.get("https://cdn.jsdelivr.net/npm/@types/react@16.9.41/index.d.ts")
					.then((react_def_file) => {
						monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
							target: monaco.languages.typescript.ScriptTarget.Latest,
							allowNonTsExtensions: true,
							moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
							module: monaco.languages.typescript.ModuleKind.CommonJS,
							noEmit: true,
							esModuleInterop: true,
							jsx: monaco.languages.typescript.JsxEmit.React,
							reactNamespace: "React",
							allowJs: true,
							typeRoots: ["node_modules/@types"],
						});

						monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
							noSemanticValidation: false,
							noSyntaxValidation: false,
						});

						monaco.languages.typescript.typescriptDefaults.addExtraLib(
							"<" + react_def_file.data + ">",
							`file:///node_modules/@react/types/index.d.ts`
						);
					});
			} */
