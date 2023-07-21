import { MDBBtn, MDBSpinner, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Tooltip } from "react-tooltip";

interface EditorButtonsProps {
	onRunCode: () => void;
}

const EditorButtons: React.FC<EditorButtonsProps> = (props) => {
	const taskState = useSelector((state: RootState) => state.task);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div>
			<MDBBtn
				className="app-tertiary app-text-primary app-button me-3 anchor-element-run-btn"
				onClick={props.onRunCode}
				disabled={taskState.buildStatus === "Pending"}
			>
				{taskState.buildStatus === "Pending" ? (
					<MDBSpinner size="sm" />
				) : (
					<MDBIcon fas icon="play" />
				)}
			</MDBBtn>
			<Tooltip delayShow={500} anchorSelect=".anchor-element-run-btn" place="top">
				Code ausführen (strg + s)
			</Tooltip>
			<MDBBtn
				className="app-tertiary app-text-primary app-button anchor-element-test-btn"
				onClick={props.onRunCode}
				disabled={taskState.buildStatus === "Pending"}
			>
				{taskState.buildStatus === "Pending" ? (
					<MDBSpinner size="sm" />
				) : (
					<MDBIcon fas icon="clipboard-list" />
				)}
			</MDBBtn>
			<Tooltip delayShow={500} anchorSelect=".anchor-element-test-btn" place="top">
				Tests ausführen
			</Tooltip>
		</div>
	);
};
export default EditorButtons;
