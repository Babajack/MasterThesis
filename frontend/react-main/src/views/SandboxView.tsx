import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import EditorComponent from "../components/Task/EditorComponent";
import PreviewComponent from "../components/Task/PreviewComponent";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSandbox, updateCode, updateFile } from "../redux/slices/sandboxSlice";
import { useEffect } from "react";
import LoadingWrapper from "../components/Utils/LoadingWrapper";

const SandboxView = () => {
	const dispatch = useDispatch<AppDispatch>();
	const sandboxState = useSelector((state: RootState) => state.sandbox);

	useEffect(() => {
		dispatch(fetchSandbox());
	}, []);

	return (
		<LoadingWrapper loadingStatus={sandboxState.loadingStatus}>
			<MDBContainer fluid className="g-0 d-flex flex-column flex-grow-1">
				<MDBRow className="g-0 flex-grow-1">
					<MDBCol
						md={6}
						sm={12}
						/* style={{ height: "90%" }} */ className="d-flex align px-2 py-1 flex-grow-1"
					>
						<EditorComponent
							{...sandboxState}
							onUpdateCode={updateCode}
							onUpdateFile={updateFile}
						/>
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
		</LoadingWrapper>
	);
};

export default SandboxView;
