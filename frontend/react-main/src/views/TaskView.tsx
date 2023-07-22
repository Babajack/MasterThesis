import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import EditorComponent from "../components/Task/EditorComponent";
import PreviewComponent from "../components/Task/PreviewComponent";
import { AppDispatch } from "../redux/store";

const TaskMenuView = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<MDBContainer fluid className="h-100 g-0">
			<MDBRow className="h-100 g-0">
				<MDBCol md={3} sm={12} className="h-100 p-2">
					<h1>Aufgabe:</h1>
				</MDBCol>
				<MDBCol
					md={5}
					sm={12}
					/* style={{ height: "90%" }} */ className="d-flex align-self-center h-100 px-2 py-1"
				>
					<EditorComponent />
				</MDBCol>
				<MDBCol
					md={4}
					sm={12}
					className="d-flex flex-column justify-content-center align-items-center h-100 p-2"
				>
					<PreviewComponent />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskMenuView;
