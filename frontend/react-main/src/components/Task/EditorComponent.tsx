import { MDBInput } from "mdb-react-ui-kit";
import * as React from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

const EditorComponent = () => {
	/* function handleEditorValidation(markers: editor.IMarker[]) {
		// model markers
		markers.forEach((marker) => console.log("onValidate:", marker.message));
	} */

	return (
		<Editor
			className="h-75"
			defaultLanguage="javascript"
			theme="vs-dark"
			//onValidate={handleEditorValidation}
			defaultValue="// some comment"
		/>
	);
};

export default EditorComponent;
