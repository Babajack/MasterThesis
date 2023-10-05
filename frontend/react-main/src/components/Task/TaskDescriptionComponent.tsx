import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Editor } from "@monaco-editor/react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import {
	MDBAccordion,
	MDBAccordionItem,
	MDBBtn,
	MDBCol,
	MDBCollapse,
	MDBIcon,
	MDBRow,
} from "mdb-react-ui-kit";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";

const TaskDescriptionComponent = () => {
	const taskState = useSelector((state: RootState) => state.task);

	const [showHints, setShowHints] = useState<Record<number, boolean>>({});
	const toggleHint = (index: number) => {
		setShowHints({ ...showHints, [index]: !showHints[index] ?? true });
	};

	const taskDescription = taskState.task.description?.map((elem, index) => {
		switch (elem.displayType) {
			case "description":
				return (
					<div
						key={"cm-dexription" + index}
						className="pb-4 text-start"
						dangerouslySetInnerHTML={{ __html: elem.text }}
					></div>
				);
			case "code":
				return (
					<CodeMirror
						key={"cm-code" + index}
						style={{ wordBreak: "break-word", fontSize: "14px" }}
						className="pb-5 text-start"
						value={elem.text}
						extensions={[javascript({ jsx: true })]}
						readOnly
						basicSetup={{
							highlightActiveLine: false,
							highlightActiveLineGutter: false,
						}}
						//theme={vscodeDark}
						//theme={createTheme({ theme: "light", settings: { background: "#193549" }, styles: [] })}
					/>
					// <Editor
					// 	key={key++}
					// 	value={elem.text}
					// 	height={"250px"}
					// 	language="Javascript"
					// 	theme="vs-dark"
					// 	options={{
					// 		readOnly: true,
					// 		wordWrap: "on",
					// 		padding: { top: 15 },
					// 		mouseWheelZoom: true,
					// 		minimap: { enabled: false },
					// 		formatOnPaste: true,
					// 		autoIndent: "full",
					// 	}}
					// />
				);
			case "hint": {
				return (
					// <fieldset key={"cm-hint" + index}>
					// 	<MDBBtn onClick={() => toggleHint(index)}>show hint</MDBBtn>
					// 	<MDBCollapse show={showHints[index]}>
					// 		Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
					// 		ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
					// 		sapiente ea proident.
					// 	</MDBCollapse>
					// </fieldset>

					<MDBAccordion key={"cm-description" + index} className="pb-4">
						<MDBAccordionItem collapseId={1} headerTitle="Hint">
							<div className="text-start" dangerouslySetInnerHTML={{ __html: elem.text }}></div>
						</MDBAccordionItem>
					</MDBAccordion>
				);
			}
		}
	});

	return (
		<div className="px-2 pb-3 app-secondary app-text-primary overflow-auto w-100 h-100">
			<h3 className="pt-3"> {taskState.task.title} </h3>
			{taskDescription}
		</div>
	);
};

export default TaskDescriptionComponent;
