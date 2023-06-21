import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import PreviewComponent from "../components/Task/PreviewComponent";
import { httpRequest } from "../network/httpRequest";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/userSlice";

const TaskView = () => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol md={6}>
					<MDBBtn onClick={() => dispatch(logoutUser())}>Logout</MDBBtn>
					<MDBBtn
						onClick={() =>
							httpRequest.updateCode([{ filename: "new.js", code: "console.log('hi')" }])
						}
					>
						Upload
					</MDBBtn>
				</MDBCol>
				<MDBCol md={6}>
					<PreviewComponent result={""} />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskView;
