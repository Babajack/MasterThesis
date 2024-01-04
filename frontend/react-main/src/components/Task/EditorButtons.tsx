import { MDBBtn, MDBSpinner, MDBIcon, MDBRow, MDBCol, MDBTooltip } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Tooltip } from "react-tooltip";
import { CodeFiles, CodeType, LoadingStatus } from "../../types";
import { ConfirmationModal } from "../Utils/ConfirmationModal";
import { useState } from "react";

interface EditorButtonsProps {
	onRunCode?: () => void;
	onTestCode?: () => void;
	onResetCode?: () => void;
	onSetToUserSolution?: () => void;
	onSetToSampleSolution?: () => void;
	onGotoNextTask?: () => void;
	onGotoPreviousTask?: () => void;
	buildStatus: LoadingStatus;
	type: CodeType;
}

const EditorButtons: React.FC<EditorButtonsProps> = (props) => {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	return (
		<MDBRow>
			<MDBCol xxl={3} sm={6} xs={6} className="d-flex order-xxl-0 order-sm-0 order-xs-0">
				{props.onTestCode && (
					<MDBTooltip title={"run tests"} tag="span" wrapperClass="d-inline-block" disableMouseDown>
						<MDBBtn
							className="app-tertiary app-text-primary app-button app-button-tertiary anchor-element-test-btn me-3"
							onClick={props.onTestCode}
							disabled={props.buildStatus === "Pending"}
						>
							{props.buildStatus === "Pending" ? (
								<MDBSpinner size="sm" />
							) : (
								<MDBIcon fas icon="play" />
							)}
						</MDBBtn>
					</MDBTooltip>
				)}

				<MDBTooltip
					title={"render website"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button app-button-tertiary anchor-element-run-btn"
						onClick={props.onRunCode}
						disabled={props.buildStatus === "Pending" || !props.onRunCode}
					>
						{props.buildStatus === "Pending" ? (
							<MDBSpinner size="sm" />
						) : (
							<MDBIcon fas icon="cog" />
						)}
					</MDBBtn>
				</MDBTooltip>
			</MDBCol>
			<MDBCol
				xxl={4}
				sm={12}
				xs={12}
				className="d-flex justify-content-center order-xxl-1 pt-xxl-0 order-sm-2 pt-sm-2 order-xs-2 pt-xs-2"
			>
				{props.type === "task" && (
					<MDBTooltip
						title={"previous task"}
						tag="span"
						wrapperClass="d-inline-block"
						disableMouseDown
					>
						<MDBBtn
							className="app-quaternary app-text-primary app-button app-button-quaternary anchor-element-user-solution-btn me-3"
							onClick={props.onGotoPreviousTask}
							disabled={!props.onGotoPreviousTask}
						>
							<MDBIcon fas icon="arrow-left" />
						</MDBBtn>
					</MDBTooltip>
				)}
				{props.type === "task" && (
					<MDBTooltip title={"next task"} tag="span" wrapperClass="d-inline-block" disableMouseDown>
						<MDBBtn
							className="app-quaternary app-text-primary app-button app-button-quaternary anchor-element-user-solution-btn"
							onClick={props.onGotoNextTask}
							disabled={!props.onGotoNextTask}
						>
							<MDBIcon fas icon="arrow-right" />
						</MDBBtn>
					</MDBTooltip>
				)}
			</MDBCol>
			<MDBCol
				xxl={5}
				sm={6}
				xs={6}
				className="d-flex justify-content-end order-xxl-2 order-sm-1 order-xs-1"
			>
				<MDBTooltip
					title={"reset code to default"}
					tag="span"
					wrapperClass="d-inline-block"
					disableMouseDown
				>
					<MDBBtn
						className="app-tertiary app-text-primary app-button app-button-tertiary anchor-element-reset-btn"
						onClick={() => setShowConfirmationModal(true)}
					>
						<MDBIcon fas icon="sync-alt" />
					</MDBBtn>

					<ConfirmationModal
						showModal={showConfirmationModal}
						setShowModal={setShowConfirmationModal}
						textBody={`Reset code? Current progress is lost!`}
						confirmationFunction={props.onResetCode}
						titel="Reset Code"
					/>
				</MDBTooltip>

				{props.type === "task" && (
					<MDBTooltip
						title={"load own solution"}
						tag="span"
						wrapperClass="d-inline-block"
						disableMouseDown
					>
						<MDBBtn
							className="app-tertiary app-text-primary app-button app-button-tertiary anchor-element-user-solution-btn ms-3"
							onClick={props.onSetToUserSolution}
							disabled={!props.onSetToUserSolution}
						>
							<MDBIcon fas icon="user-check" />
						</MDBBtn>
					</MDBTooltip>
				)}

				{props.type === "task" && (
					<MDBTooltip
						title={"load sample solution"}
						tag="span"
						wrapperClass="d-inline-block"
						disableMouseDown
					>
						<MDBBtn
							className="app-tertiary app-text-primary app-button app-button-tertiary ms-3"
							onClick={props.onSetToSampleSolution}
							disabled={!props.onSetToSampleSolution}
						>
							<MDBIcon fas icon="check" />
						</MDBBtn>
					</MDBTooltip>
				)}
			</MDBCol>
		</MDBRow>
	);
};
export default EditorButtons;
