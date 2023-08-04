import { MDBBtn, MDBSpinner, MDBIcon, MDBRow, MDBCol, MDBTooltip } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Tooltip } from "react-tooltip";
import { CodeFiles, LoadingStatus } from "../../types";
import { ConfirmationModal } from "../Utils/ConfirmationModal";
import { useState } from "react";

interface EditorButtonsProps {
	onRunCode: () => void;
	onTestCode?: () => void;
	onResetCode?: () => void;
	onSetToUserSolution?: () => void;
	onSetToSampleSolution?: () => void;
	buildStatus: LoadingStatus;
}

const EditorButtons: React.FC<EditorButtonsProps> = (props) => {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	return (
		<MDBRow>
			<MDBCol className="d-flex ">
				<MDBTooltip
					title={"Code ausführen (strg + s)"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button me-3 anchor-element-run-btn"
						onClick={props.onRunCode}
						disabled={props.buildStatus === "Pending"}
					>
						{props.buildStatus === "Pending" ? (
							<MDBSpinner size="sm" />
						) : (
							<MDBIcon fas icon="play" />
						)}
					</MDBBtn>
				</MDBTooltip>

				{props.onTestCode && (
					<MDBTooltip
						title={"Tests ausführen"}
						tag="span"
						wrapperClass="d-inline-block"
						disableMouseDown
					>
						<MDBBtn
							className="app-tertiary app-text-primary app-button anchor-element-test-btn"
							onClick={props.onTestCode}
							disabled={props.buildStatus === "Pending"}
						>
							{props.buildStatus === "Pending" ? (
								<MDBSpinner size="sm" />
							) : (
								<MDBIcon fas icon="clipboard-list" />
							)}
						</MDBBtn>
					</MDBTooltip>
				)}
			</MDBCol>
			<MDBCol className="d-flex justify-content-end">
				<MDBTooltip
					title={"Code zurücksetzen"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button me-3 anchor-element-reset-btn"
						onClick={() => setShowConfirmationModal(true)}
					>
						<MDBIcon fas icon="sync-alt" />
					</MDBBtn>

					<ConfirmationModal
						showModal={showConfirmationModal}
						setShowModal={setShowConfirmationModal}
						textBody={`Code wirklich zurücksetzen? Aktueller Fortschritt geht verloren.`}
						confirmationFunction={props.onResetCode}
						titel="Code zurücksetzen"
					/>
				</MDBTooltip>

				<MDBTooltip
					title={"Eigene Lösung laden"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button me-3 anchor-element-user-solution-btn"
						onClick={props.onSetToUserSolution}
						disabled={!props.onSetToUserSolution}
					>
						<MDBIcon fas icon="user-check" />
					</MDBBtn>
				</MDBTooltip>

				<MDBTooltip
					title={"Musterlösung laden"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button "
						onClick={props.onSetToSampleSolution}
						disabled={!props.onSetToSampleSolution}
					>
						<MDBIcon fas icon="check" />
					</MDBBtn>
				</MDBTooltip>
			</MDBCol>
		</MDBRow>
	);
};
export default EditorButtons;
