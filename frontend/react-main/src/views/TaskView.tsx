import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import PreviewComponent from "../components/PreviewComponent";
import { transpileCode } from "../utils/codeTranspiler";
import { evaluateCode } from "../utils/codeEvaluator";

const TaskView = () => {
	const code = transpileCode("let test = 5;\nconsole.log(test)");
	const result = evaluateCode(code);

	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol md={6}></MDBCol>
				<MDBCol md={6}>
					<PreviewComponent result={""} />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskView;
