import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import PreviewComponent from "../components/PreviewComponent";

const TaskView = () => {
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
