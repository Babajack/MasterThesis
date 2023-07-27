import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import EditorComponent from "../components/Task/EditorComponent";
import PreviewComponent from "../components/Task/PreviewComponent";
import { AppDispatch, RootState } from "../redux/store";
import { updateCode, updateFile } from "../redux/slices/sandboxSlice";

const SandboxView = () => {
	const sandboxState = useSelector((state: RootState) => state.sandbox);
	return (
		<MDBContainer fluid className="g-0 d-flex flex-column flex-grow-1">
			<MDBRow className="g-0 flex-grow-1">
				<MDBCol
					md={6}
					sm={12}
					/* style={{ height: "90%" }} */ className="d-flex align px-2 py-1 flex-grow-1"
				>
					<EditorComponent {...sandboxState} onUpdateCode={updateCode} onUpdateFile={updateFile} />
				</MDBCol>
				<MDBCol
					md={6}
					sm={12}
					className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-2"
				>
					<PreviewComponent {...sandboxState} type="sandbox" />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default SandboxView;
