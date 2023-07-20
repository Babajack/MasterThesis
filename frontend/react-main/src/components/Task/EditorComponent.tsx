import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import * as React from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import TabsComponent from "./TabsComponent";
import { updateCode, updateFile } from "../../redux/slices/taskSlice";
import * as prettier from "prettier/standalone";
import * as babel from "prettier/parser-babel";
import * as typescript from "prettier/parser-typescript";
import { httpRequest } from "../../network/httpRequest";
//import "./EditorComponent.css";

const EditorComponent: React.FC = () => {
	const taskState = useSelector((state: RootState) => state.task);
	const dispatch = useDispatch<AppDispatch>();

	const dirtyFlag = useRef(false);

	const [currentFilename, setCurrentFilename] = useState<string>("App.js");
	const currentFile = taskState.currentFiles.find((elem) => elem.filename === currentFilename)!;

	const editorRef = useRef<editor.IStandaloneCodeEditor>();
	const monacoRef = useRef<any>();
	/* const monacoRef =
		useRef<
			typeof import("c:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/frontend/react-main/node_modules/monaco-editor/esm/vs/editor/editor.api")
		>(); */

	useEffect(() => {
		editorRef.current?.focus();
	}, [currentFile?.filename]);

	/**
	 * handle monaco configuration before mount
	 * @param monaco
	 */
	const handleBeforeMount = (
		monaco: any //typeof import("c:/Users/pheld/Desktop/Master Thesis/Repository/master-thesis/frontend/react-main/node_modules/monaco-editor/esm/vs/editor/editor.api")
	) => {
		/**
		 * autocomplete for JSX HTML Tags
		 */
		monaco.languages.registerCompletionItemProvider("javascript", {
			triggerCharacters: [">"],
			provideCompletionItems: (model: any, position: any) => {
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

		/* monaco.languages.registerDocumentFormattingEditProvider("javascript", {
			async provideDocumentFormattingEdits(model, options, token) {
				//const prettier = await import("prettier/standalone");
				//const babylon = await import("prettier/parser-babylon");
				const text = await prettier.format(model.getValue(), {
					parser: "babel",
					//plugins: [babylon],
					singleQuote: true,
				});

				return [
					{
						range: model.getFullModelRange(),
						text,
					},
				];
			},
		}); */

		/**
		 * load react types for autocomplete
		 */
		fetch("https://cdn.jsdelivr.net/npm/@types/react@18.2/index.d.ts")
			.then((react_def_file) => {
				react_def_file.text().then((res) => {
					/* monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
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
					}); */

					// validation settings
					monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
						noSemanticValidation: false,
						noSyntaxValidation: false,
					});

					// compiler options
					monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
						target: monaco.languages.typescript.ScriptTarget.ES2015,
						allowNonTsExtensions: true,
						jsx: monaco.languages.typescript.JsxEmit.React,
						allowJs: true,
						allowSyntheticDefaultImports: true,
						//alwaysStrict: true,
						//checkJs: true,
						reactNamespace: "React",
					});

					monaco.languages.typescript.javascriptDefaults.addExtraLib(
						res,
						`file:///node_modules/@types/react/index.d.ts`
					);
				});
			})
			.catch((e) => console.log(e));
	};

	// BROKEN:
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

	/**
	 * remove annoying resizeObserver loop limit exceeded error
	 */
	useEffect(() => {
		window.addEventListener("error", (e) => {
			if (e.message === "ResizeObserver loop limit exceeded") {
				const resizeObserverErrDiv = document.getElementById(
					"webpack-dev-server-client-overlay-div"
				);
				const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
				if (resizeObserverErr) {
					resizeObserverErr.setAttribute("style", "display: none");
				}
				if (resizeObserverErrDiv) {
					resizeObserverErrDiv.setAttribute("style", "display: none");
				}
			}
		});
	}, []);

	const handleRunCode = () => {
		if (dirtyFlag.current) {
			dispatch(updateCode([...taskState.currentFiles]));
		}
		dirtyFlag.current = false;
	};

	return (
		<MDBRow className="h-100 w-100 g-0" style={{ backgroundColor: "grey" }}>
			<MDBCol
				md={12}

				/* style={{ backgroundColor: "#1e1e1e", backgroundClip: "content-box" }} */
			>
				<TabsComponent
					setCurrentFilename={setCurrentFilename}
					currentFilename={currentFilename}
					onDeleteFile={(filename: string) => {
						try {
							monacoRef.current.editor.getModel(monacoRef.current.Uri.parse(filename))?.dispose();
						} catch (error) {
							if (process.env.REACT_APP_DEV_MODE) console.log(error);
						}
					}}
				/>
			</MDBCol>
			<MDBCol md={12} className="px-1">
				<Editor
					height={"99%"}
					onValidate={(markers) => {
						console.log(markers);
					}}
					//wrapperProps={{ className: "d-block" }}
					//className="h-100"
					options={{
						wordWrap: "on",
						padding: { top: 15 },
						mouseWheelZoom: true,
						minimap: { enabled: false },
						formatOnPaste: true,
						autoIndent: "full",
						//automaticLayout: true,
						formatOnType: true,
						//autoClosingBrackets: "always",
					}}
					//height={"100%"}
					//defaultLanguage={currentFile.}
					//defaultLanguage="typescript"
					//language="javascript"
					theme="vs-dark"
					//value={currentFile?.code ?? ""}
					beforeMount={handleBeforeMount}
					onMount={(editor, monaco) => {
						editorRef.current = editor;
						monacoRef.current = monaco;
						setTimeout(() => {
							// add custom commands
							//editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, handleRunCode);
							editor.addAction({
								id: "runCode",
								label: "Run Code",
								run: handleRunCode,
								keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
							});
						}, 0);

						//window.onresize = () => {
						//	editor.layout();
						//};
					}}
					path={currentFile.filename}
					defaultValue={currentFile.code}
					saveViewState={true}
					onChange={(value, event) => {
						//console.log(JSON.stringify(currentFile.code));

						//console.log(value?.replace("\n", "\r\n"));
						//console.log(value);
						//console.log(editorRef.current?.getValue());
						// prettier
						//@ts-ignore
						//	.format(value!, { parser: "babel", plugins: [babel] })
						//	.then((text) => console.log(text));
						dirtyFlag.current = true;

						//console.log(currentFile.code);

						dispatch(
							updateFile({
								old: currentFile,
								new: { ...currentFile, filename: currentFile.filename, code: value ?? "" },
							})
						);
					}}
				/>
			</MDBCol>
			<MDBCol className="py-2" style={{}} md={12}>
				<MDBBtn
					onClick={() => {
						dirtyFlag.current = true;
						handleRunCode();
					}}
					disabled={taskState.buildStatus === "Pending"}
				>
					{taskState.buildStatus === "Pending" ? <MDBSpinner size="sm" /> : "Run"}
				</MDBBtn>
			</MDBCol>
		</MDBRow>
	);
};

export default EditorComponent;
