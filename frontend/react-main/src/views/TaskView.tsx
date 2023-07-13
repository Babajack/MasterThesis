import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import PreviewComponent from "../components/Task/PreviewComponent";
import { httpRequest } from "../network/httpRequest";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/userSlice";
import EditorComponent from "../components/Task/EditorComponent";

const TaskView = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<MDBContainer fluid className="h-100 g-0">
			<MDBRow className="h-100 g-0">
				<MDBCol
					md={3}
					sm={12}
					style={{ background: "lightgray" }}
					className="h-100 border border-5 border-dark"
				>
					<h1>Aufgabe:</h1>
				</MDBCol>
				<MDBCol
					md={5}
					sm={12}
					/* style={{ height: "90%" }} */ className="d-flex align-self-center h-100"
				>
					<EditorComponent />
				</MDBCol>
				<MDBCol
					md={4}
					sm={12}
					className="d-flex flex-column justify-content-center align-items-center h-100 border border-5 border-dark"
				>
					<PreviewComponent />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskView;
